import { describe, it, expect } from "vitest";
import { contactSchema } from "./validation";

describe("contactSchema", () => {
  const base = {
    name: "Ariel Del Fresno",
    email: "ariel@example.com",
    message: "Quiero automatizar el flujo de leads de mi PyME.",
  };

  it("acepta payload válido mínimo", () => {
    const r = contactSchema.safeParse(base);
    expect(r.success).toBe(true);
  });

  it("acepta empresa opcional", () => {
    const r = contactSchema.safeParse({ ...base, company: "Acme SA" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.company).toBe("Acme SA");
  });

  it("normaliza email a lowercase", () => {
    const r = contactSchema.safeParse({ ...base, email: "ARIEL@Example.COM" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe("ariel@example.com");
  });

  it("rechaza email inválido", () => {
    const r = contactSchema.safeParse({ ...base, email: "no-es-email" });
    expect(r.success).toBe(false);
  });

  it("rechaza nombre muy corto", () => {
    const r = contactSchema.safeParse({ ...base, name: "A" });
    expect(r.success).toBe(false);
  });

  it("rechaza mensaje muy corto", () => {
    const r = contactSchema.safeParse({ ...base, message: "hola" });
    expect(r.success).toBe(false);
  });

  it("trata empresa vacía como undefined", () => {
    const r = contactSchema.safeParse({ ...base, company: "  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.company).toBeUndefined();
  });

  it("rechaza honeypot con contenido", () => {
    const r = contactSchema.safeParse({ ...base, website: "http://spam" });
    expect(r.success).toBe(false);
  });

  it("acepta honeypot vacío o ausente", () => {
    expect(contactSchema.safeParse({ ...base, website: "" }).success).toBe(true);
    expect(contactSchema.safeParse(base).success).toBe(true);
  });
});
