import { describe, it, expect, beforeEach, vi } from "vitest";

// Mocks de los módulos externos
vi.mock("@/lib/db", () => ({
  insertLead: vi.fn(),
  recentLeadsByIp: vi.fn(),
}));

vi.mock("@/lib/email", () => ({
  sendLeadNotification: vi.fn(),
}));

import * as db from "@/lib/db";
import * as email from "@/lib/email";

beforeEach(() => {
  vi.clearAllMocks();
  process.env.DATABASE_URL = "postgres://test";
  process.env.RESEND_API_KEY = "re_test";
  process.env.RESEND_FROM = "test@resend.dev";
  process.env.CONTACT_TO_EMAIL = "to@example.com";
  process.env.IP_HASH_SALT = "test-salt";
});

async function callRoute(body: unknown, headers: Record<string, string> = {}) {
  const { POST } = await import("./route");
  const req = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
  const res = await POST(req);
  const json = (await res.json()) as {
    ok: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
  };
  return { res, json };
}

const validPayload = {
  name: "Ariel",
  email: "ariel@example.com",
  message: "Quiero automatizar el alta de clientes en mi PyME.",
};

describe("POST /api/contact", () => {
  it("éxito: inserta lead, manda email, retorna ok:true", async () => {
    vi.mocked(db.recentLeadsByIp).mockResolvedValue(0);
    vi.mocked(db.insertLead).mockResolvedValue({ id: "42" });
    vi.mocked(email.sendLeadNotification).mockResolvedValue(undefined);

    const { res, json } = await callRoute(validPayload);

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(db.insertLead).toHaveBeenCalledOnce();
    expect(email.sendLeadNotification).toHaveBeenCalledOnce();
  });

  it("validación falla: email inválido → 400 ok:false", async () => {
    const { res, json } = await callRoute({ ...validPayload, email: "no-es-email" });
    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(db.insertLead).not.toHaveBeenCalled();
    expect(email.sendLeadNotification).not.toHaveBeenCalled();
  });

  it("validación falla: devuelve fieldErrors por campo (no solo global)", async () => {
    const { json } = await callRoute({
      name: "A", // muy corto
      email: "no-es-email",
      message: "corto", // < 10
    });
    expect(json.ok).toBe(false);
    expect(json.fieldErrors).toBeDefined();
    expect(json.fieldErrors?.name).toBeTruthy();
    expect(json.fieldErrors?.email).toBeTruthy();
    expect(json.fieldErrors?.message).toBeTruthy();
    // El honeypot nunca se expone en fieldErrors
    expect(json.fieldErrors?.website).toBeUndefined();
  });

  it("honeypot disparado: retorna ok:true silenciosamente sin guardar/mandar", async () => {
    const { res, json } = await callRoute({
      ...validPayload,
      website: "http://spam-bot.com",
    });
    // No revelamos que detectamos el bot
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(db.insertLead).not.toHaveBeenCalled();
    expect(email.sendLeadNotification).not.toHaveBeenCalled();
  });

  it("rate limit: si hay >=3 leads recientes desde la misma IP → 429", async () => {
    vi.mocked(db.recentLeadsByIp).mockResolvedValue(3);

    const { res, json } = await callRoute(validPayload, {
      "x-forwarded-for": "9.9.9.9",
    });

    expect(res.status).toBe(429);
    expect(json.ok).toBe(false);
    expect(db.insertLead).not.toHaveBeenCalled();
  });

  it("Resend falla: igual guarda en DB y retorna ok:true", async () => {
    vi.mocked(db.recentLeadsByIp).mockResolvedValue(0);
    vi.mocked(db.insertLead).mockResolvedValue({ id: "1" });
    vi.mocked(email.sendLeadNotification).mockRejectedValue(new Error("Resend down"));

    const { res, json } = await callRoute(validPayload);

    // El lead quedó en DB; el email fallido no debe romper la UX del usuario
    expect(db.insertLead).toHaveBeenCalledOnce();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
  });

  it("body inválido (JSON roto) → 400", async () => {
    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("hashea IP antes de pasar al rate-limit (no usa IP cruda)", async () => {
    vi.mocked(db.recentLeadsByIp).mockResolvedValue(0);
    vi.mocked(db.insertLead).mockResolvedValue({ id: "1" });
    vi.mocked(email.sendLeadNotification).mockResolvedValue(undefined);

    await callRoute(validPayload, { "x-forwarded-for": "8.8.8.8" });

    const callArg = vi.mocked(db.recentLeadsByIp).mock.calls[0]?.[0];
    expect(callArg).toBeDefined();
    expect(callArg).not.toBe("8.8.8.8");
    expect(callArg).toMatch(/^[a-f0-9]{64}$/);
  });
});
