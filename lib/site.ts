export function siteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const SITE_NAME = "delfresno/automations";
export const SITE_AUTHOR = "Guillermo Ariel Del Fresno";
export const SITE_DESCRIPTION =
  "Automatizo procesos repetitivos con IA. Pipelines, agentes y dashboards en producción para PyMEs y agencias.";
export const SITE_TITLE = `${SITE_AUTHOR} — Automatización con IA`;
export const CAL_URL = "https://cal.com/guillermo-ariel-del-fresno/30min";
