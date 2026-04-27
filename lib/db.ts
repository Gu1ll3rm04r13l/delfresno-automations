import { neon } from "@neondatabase/serverless";

let _sql: ReturnType<typeof neon> | null = null;

export function getSql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL no está configurada");
  _sql = neon(url);
  return _sql;
}

export type Lead = {
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
  userAgent?: string;
  ipHash?: string;
};

export async function insertLead(lead: Lead): Promise<{ id: string }> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO leads (name, email, company, message, source, user_agent, ip_hash)
    VALUES (
      ${lead.name},
      ${lead.email},
      ${lead.company ?? null},
      ${lead.message},
      ${lead.source ?? "web"},
      ${lead.userAgent ?? null},
      ${lead.ipHash ?? null}
    )
    RETURNING id::text AS id
  `;
  return { id: (rows[0] as { id: string }).id };
}

export async function recentLeadsByIp(
  ipHash: string,
  windowSeconds = 300
): Promise<number> {
  const sql = getSql();
  const rows = await sql`
    SELECT count(*)::int AS n
    FROM leads
    WHERE ip_hash = ${ipHash}
      AND created_at > now() - (${windowSeconds} || ' seconds')::interval
  `;
  return (rows[0] as { n: number }).n;
}
