import { contactSchema } from "@/lib/validation";
import { insertLead, recentLeadsByIp } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";
import { hashIp, getClientIp } from "@/lib/rate-limit";

const RATE_LIMIT_WINDOW_SECONDS = 300;
const RATE_LIMIT_MAX = 3;

export async function POST(request: Request): Promise<Response> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "Body inválido" }, 400);
  }

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const isHoneypot = parsed.error.issues.some(
      (i) => i.path[0] === "website"
    );
    if (isHoneypot) {
      // No revelamos detección de bot — devolvemos ok:true sin guardar
      return json({ ok: true }, 200);
    }
    const firstError = parsed.error.issues[0]?.message ?? "Datos inválidos";
    return json({ ok: false, error: firstError }, 400);
  }

  const data = parsed.data;

  // Rate limit por IP
  const ip = getClientIp(request.headers);
  const salt = process.env.IP_HASH_SALT ?? "default-salt-change-me";
  const ipHash = hashIp(ip, salt);

  try {
    const recent = await recentLeadsByIp(ipHash, RATE_LIMIT_WINDOW_SECONDS);
    if (recent >= RATE_LIMIT_MAX) {
      return json(
        { ok: false, error: "Muchos envíos recientes. Probá en unos minutos." },
        429
      );
    }
  } catch (err) {
    console.error("[contact] rate-limit check failed", err);
    // No bloqueamos el flujo si el check de rate-limit falla; seguimos.
  }

  // Insert
  try {
    await insertLead({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      source: "web",
      userAgent: request.headers.get("user-agent") ?? undefined,
      ipHash,
    });
  } catch (err) {
    console.error("[contact] insertLead failed", err);
    return json(
      { ok: false, error: "No pudimos guardar tu mensaje. Probá de nuevo." },
      500
    );
  }

  // Email (best-effort: si falla, el lead ya quedó guardado)
  try {
    await sendLeadNotification({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
    });
  } catch (err) {
    console.error("[contact] sendLeadNotification failed", err);
  }

  return json({ ok: true }, 200);
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
