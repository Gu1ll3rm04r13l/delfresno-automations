import HeroCanvas from "./components/HeroCanvas";
import StackList from "./components/StackList";
import Faq from "./components/Faq";
import ContactForm from "./components/ContactForm";

const CAL_URL = "https://cal.com/guillermo-ariel-del-fresno/30min";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col">
      <Hero />
      <Servicios />
      <Proceso />
      <Stack />
      <ManualVsIA />
      <FaqSection />
      <Contacto />
    </main>
  );
}

type Servicio = {
  num: string;
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
  stack: string[];
};

const SERVICIOS: Servicio[] = [
  {
    num: "01",
    tag: "Agentes",
    title: "Agentes conversacionales con IA",
    desc: "Bots de soporte, ventas o calificación de leads. Conectados a tu CRM, tu base de conocimiento y tus canales (WhatsApp, web, email).",
    bullets: ["RAG sobre tus docs", "Tool-use + acciones", "Handoff a humano"],
    stack: ["OpenAI", "Anthropic", "WhatsApp", "RAG"],
  },
  {
    num: "02",
    tag: "Pipelines",
    title: "Pipelines de datos con IA",
    desc: "Python + LLMs para extraer, clasificar y enriquecer datos. Procesar PDFs, emails, formularios o scraping a estructura limpia.",
    bullets: ["Extracción de PDFs/emails", "Clasificación automática", "Validación + retry"],
    stack: ["Python", "LangChain", "Postgres", "Cron"],
  },
  {
    num: "03",
    tag: "No-code",
    title: "Automatizaciones no-code",
    desc: "Workflows en n8n, Make o Zapier para conectar herramientas sin pelear con APIs. Útil cuando velocidad importa más que custom.",
    bullets: ["n8n self-hosted", "Integraciones SaaS", "Triggers + webhooks"],
    stack: ["n8n", "Make", "Zapier", "Webhooks"],
  },
  {
    num: "04",
    tag: "Dashboards",
    title: "Dashboards a medida",
    desc: "Paneles en Next.js sobre Postgres/Supabase para ver lo que importa: pipeline, KPIs, métricas operativas. Sin templates genéricos.",
    bullets: ["Next.js + Server Components", "Auth + roles", "Realtime opcional"],
    stack: ["Next.js", "Supabase", "Neon", "Vercel"],
  },
];

function Servicios() {
  return (
    <section
      id="servicios"
      className="relative border-t border-white/5 bg-bg py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <header className="mb-14 flex flex-col gap-4 md:mb-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            ※ Servicios
          </span>
          <h2
            className="max-w-3xl text-balance font-display text-3xl font-bold leading-[1.05] sm:text-4xl md:text-5xl"
            style={{ letterSpacing: "var(--tracking-display)" }}
          >
            Cuatro formas concretas de
            <br className="hidden sm:block" />
            <span className="text-muted">automatizar tu operación.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {SERVICIOS.map((s) => (
            <ServicioCard key={s.num} servicio={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Paso = {
  num: string;
  duracion: string;
  title: string;
  desc: string;
  outputs: string[];
};

const PASOS: Paso[] = [
  {
    num: "01",
    duracion: "Día 0 — gratis",
    title: "Auditoría",
    desc: "Llamada de 30 min. Identificamos 1 proceso concreto que sangra horas o plata. Si no veo cómo automatizarlo con impacto real, te lo digo.",
    outputs: ["Proceso target definido", "Estimación de ahorro", "Decisión: avanzo o no"],
  },
  {
    num: "02",
    duracion: "7 días",
    title: "Prototipo",
    desc: "Construyo la versión funcional sobre tus datos reales. Sin slides ni mockups: corre en staging, lo probás vos. Si no convence, no seguimos.",
    outputs: ["Demo en staging", "Código en repo privado", "Métricas baseline"],
  },
  {
    num: "03",
    duracion: "1–2 semanas",
    title: "Integración",
    desc: "Conecto el prototipo a tus sistemas (CRM, DB, canales). Despliego en producción con logs, alertas y handoff a tu equipo.",
    outputs: ["Producción + monitoreo", "Documentación técnica", "Handoff con tu equipo"],
  },
  {
    num: "04",
    duracion: "Mensual opcional",
    title: "Soporte",
    desc: "Mantenimiento, ajuste de prompts, métricas y mejoras. Stack estándar y documentado. Te quedás cuando agrega valor.",
    outputs: ["SLA de respuesta", "Iteración mensual", "Reporte de métricas"],
  },
];

function Proceso() {
  return (
    <section
      id="proceso"
      className="relative border-t border-white/5 bg-bg py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <header className="mb-14 flex flex-col gap-4 md:mb-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            ※ Proceso
          </span>
          <h2
            className="max-w-3xl text-balance font-display text-3xl font-bold leading-[1.05] sm:text-4xl md:text-5xl"
            style={{ letterSpacing: "var(--tracking-display)" }}
          >
            De idea a producción
            <br className="hidden sm:block" />
            <span className="text-muted">en cuatro pasos.</span>
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Trabajo en sprints cortos con checkpoints claros. Si en cualquier
            paso no ves valor, paramos y no pagás el siguiente.
          </p>
        </header>

        <ol className="relative flex flex-col gap-px">
          {/* vertical line */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[22px] top-0 w-px bg-gradient-to-b from-accent/40 via-white/8 to-transparent md:left-[34px]"
          />
          {PASOS.map((p, i) => (
            <PasoRow key={p.num} paso={p} last={i === PASOS.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function PasoRow({ paso, last }: { paso: Paso; last: boolean }) {
  return (
    <li className="relative flex gap-5 py-7 md:gap-8 md:py-9">
      {/* Number badge */}
      <div className="relative z-10 flex-shrink-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-bg font-mono text-xs text-text shadow-[0_0_0_4px_var(--color-bg)] md:h-[68px] md:w-[68px] md:text-sm">
          {paso.num}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 pb-2 md:gap-4">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3
            className="font-display text-2xl font-bold leading-tight md:text-3xl"
            style={{ letterSpacing: "var(--tracking-display)" }}
          >
            {paso.title}
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-2">
            {paso.duracion}
          </span>
        </div>

        <p className="max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">
          {paso.desc}
        </p>

        <ul className="mt-1 flex flex-col gap-1.5 md:flex-row md:flex-wrap md:gap-x-5">
          {paso.outputs.map((o) => (
            <li
              key={o}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text/75"
            >
              <span className="text-accent">→</span>
              {o}
            </li>
          ))}
        </ul>
      </div>

      {!last && null}
    </li>
  );
}

type CompareRow = {
  label: string;
  manual: { text: string; weight: number };
  ia: { text: string; weight: number };
};

const COMPARE_ROWS: CompareRow[] = [
  {
    label: "Tareas repetitivas",
    manual: { text: "Horas-persona por día", weight: 95 },
    ia: { text: "Corre solo, 24/7", weight: 12 },
  },
  {
    label: "Errores",
    manual: { text: "Humanos cansados, copy-paste", weight: 70 },
    ia: { text: "Validación + retry automático", weight: 15 },
  },
  {
    label: "Disponibilidad",
    manual: { text: "Horario laboral, vacaciones", weight: 50 },
    ia: { text: "Siempre disponible", weight: 100 },
  },
  {
    label: "Escalar volumen",
    manual: { text: "Contratar + entrenar", weight: 80 },
    ia: { text: "Más cómputo, mismo proceso", weight: 25 },
  },
  {
    label: "Trazabilidad",
    manual: { text: "Excel disperso, memoria", weight: 35 },
    ia: { text: "Logs completos por defecto", weight: 95 },
  },
];

function ManualVsIA() {
  return (
    <section
      id="comparativa"
      className="relative border-t border-white/5 bg-bg py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <header className="mb-14 flex flex-col gap-4 md:mb-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            ※ Manual vs IA
          </span>
          <h2
            className="max-w-3xl text-balance font-display text-3xl font-bold leading-[1.05] sm:text-4xl md:text-5xl"
            style={{ letterSpacing: "var(--tracking-display)" }}
          >
            Lo que cambia cuando
            <br className="hidden sm:block" />
            <span className="text-muted">automatizás bien.</span>
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            No reemplaza a tu equipo: les saca de encima lo repetitivo para que
            usen el tiempo en lo que importa.
          </p>
        </header>

        {/* Column headers */}
        <div className="mb-3 grid grid-cols-[1fr_2fr_2fr] gap-3 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted/80 md:grid-cols-[180px_1fr_1fr] md:gap-6">
          <span></span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-muted/60" />
            Manual
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Con IA
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/8 bg-surface/40">
          {COMPARE_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_2fr_2fr] items-center gap-3 px-4 py-5 md:grid-cols-[180px_1fr_1fr] md:gap-6 md:px-6 md:py-6 ${
                i !== COMPARE_ROWS.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <span className="font-display text-sm font-medium md:text-base">
                {row.label}
              </span>

              <CompareBar
                text={row.manual.text}
                weight={row.manual.weight}
                tone="manual"
              />
              <CompareBar
                text={row.ia.text}
                weight={row.ia.weight}
                tone="ia"
              />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-6 max-w-2xl font-mono text-[11px] leading-relaxed text-muted/70">
          * Las barras son ilustrativas. El impacto real depende del proceso —
          eso lo medimos en la auditoría inicial.
        </p>
      </div>
    </section>
  );
}

function CompareBar({
  text,
  weight,
  tone,
}: {
  text: string;
  weight: number;
  tone: "manual" | "ia";
}) {
  const isIA = tone === "ia";
  return (
    <div className="flex flex-col gap-2">
      <span
        className={`text-[12px] leading-snug md:text-[13px] ${
          isIA ? "text-text" : "text-muted"
        }`}
      >
        {text}
      </span>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ${
            isIA
              ? "bg-gradient-to-r from-accent to-accent-2"
              : "bg-muted/40"
          }`}
          style={{ width: `${weight}%` }}
        />
      </div>
    </div>
  );
}

const GARANTIAS = [
  "Auditoría inicial gratis (30 min, sin compromiso)",
  "Si el prototipo no convence, no avanzamos",
  "Sin contratos atados ni mínimos mensuales",
  "Stack estándar y documentado",
  "NDA antes de pasarme datos sensibles",
  "Respuesta personal en menos de 24 hs",
];

function Contacto() {
  return (
    <section
      id="contacto"
      className="relative border-t border-white/5 bg-bg py-24 md:py-32"
    >
      {/* Radial accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 0%, rgba(230,57,70,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <header className="mb-14 flex flex-col gap-4 md:mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            ※ Contacto
          </span>
          <h2
            className="max-w-3xl text-balance font-display text-3xl font-bold leading-[1.05] sm:text-4xl md:text-5xl"
            style={{ letterSpacing: "var(--tracking-display)" }}
          >
            Contame qué proceso querés
            <br className="hidden sm:block" />
            <span className="text-muted">dejar de hacer a mano.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          {/* Garantías column */}
          <aside className="flex flex-col gap-8">
            <div>
              <p className="text-[15px] leading-relaxed text-muted md:text-base">
                Mandame un mensaje o agendá la llamada directo. Lo que prefieras.
              </p>
              <a
                href="https://cal.com/guillermo-ariel-del-fresno/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-text/90 transition-colors hover:border-white/30 hover:bg-white/[0.04]"
              >
                Agendar diagnóstico (30 min)
                <span>→</span>
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/80">
                Lo que te garantizo
              </span>
              <ul className="flex flex-col gap-3">
                {GARANTIAS.map((g) => (
                  <li
                    key={g}
                    className="flex items-start gap-3 text-[14px] leading-relaxed text-text/90 md:text-[15px]"
                  >
                    <span className="mt-2 inline-block h-px w-3 flex-shrink-0 bg-accent" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form column */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      id="faq"
      className="relative border-t border-white/5 bg-bg py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
        <header className="mb-14 flex flex-col gap-4 md:mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            ※ FAQ
          </span>
          <h2
            className="max-w-3xl text-balance font-display text-3xl font-bold leading-[1.05] sm:text-4xl md:text-5xl"
            style={{ letterSpacing: "var(--tracking-display)" }}
          >
            Preguntas
            <br className="hidden sm:block" />
            <span className="text-muted">que suelen aparecer.</span>
          </h2>
        </header>

        <Faq />

        <p className="mt-8 text-center font-mono text-[12px] text-muted/80">
          ¿No está la tuya?{" "}
          <a
            href="#contacto"
            className="text-text underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Mandámela acá ↓
          </a>
        </p>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section
      id="stack"
      className="relative border-t border-white/5 bg-bg py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <header className="mb-14 flex flex-col gap-4 md:mb-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            ※ Stack
          </span>
          <h2
            className="max-w-3xl text-balance font-display text-3xl font-bold leading-[1.05] sm:text-4xl md:text-5xl"
            style={{ letterSpacing: "var(--tracking-display)" }}
          >
            Herramientas que uso
            <br className="hidden sm:block" />
            <span className="text-muted">todos los días.</span>
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Stack moderno, open-source donde tiene sentido, comercial donde
            ahorra tiempo. Sin tecnologías exóticas que después nadie pueda
            mantener.
          </p>
        </header>

        <StackList />
      </div>
    </section>
  );
}

function ServicioCard({ servicio }: { servicio: Servicio }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/8 bg-surface/60 backdrop-blur transition-colors hover:border-white/15">
      {/* Window titlebar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-2/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted/30" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {servicio.tag}.sh
        </span>
        <span className="font-mono text-[10px] text-muted/70">{servicio.num}</span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5 p-6 md:p-8">
        <h3
          className="font-display text-xl font-bold leading-tight md:text-2xl"
          style={{ letterSpacing: "var(--tracking-display)" }}
        >
          {servicio.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted md:text-[15px]">
          {servicio.desc}
        </p>

        <ul className="flex flex-col gap-2 border-t border-white/5 pt-5">
          {servicio.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 font-mono text-[12px] text-text/85"
            >
              <span className="mt-1.5 inline-block h-px w-3 flex-shrink-0 bg-accent" />
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {servicio.stack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/8 bg-white/[0.02] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(230,57,70,0.08), transparent 60%)",
        }}
      />
    </article>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Radial gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 5%, rgba(230,57,70,0.18), transparent 60%), radial-gradient(ellipse 55% 45% at 90% 95%, rgba(255,107,122,0.14), transparent 65%)",
        }}
      />

      {/* Animated node graph */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <HeroCanvas />
      </div>

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(8,7,10,0.65) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32 md:px-10 md:py-40">
        <div className="flex flex-col gap-8 md:max-w-3xl">
          {/* Status pill */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Disponible para nuevos proyectos
          </span>

          {/* Headline */}
          <h1
            className="text-balance font-display text-4xl font-bold leading-[0.98] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ letterSpacing: "var(--tracking-display)" }}
          >
            Automatizo procesos repetitivos con{" "}
            <span className="bg-gradient-to-br from-accent-2 to-accent bg-clip-text text-transparent">
              IA
            </span>
            .
            <br className="hidden sm:block" />
            Pipelines, agentes y dashboards{" "}
            <span className="text-muted">en producción.</span>
          </h1>

          {/* Sub */}
          <p className="max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            Construyo automatizaciones con IA para PyMEs y agencias. Del prototipo
            al deploy en 7 días. Sin reuniones eternas, sin slides.
          </p>

          {/* CTAs */}
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-sm font-medium text-white transition-all hover:bg-accent-2 hover:shadow-[0_8px_30px_-8px_rgba(230,57,70,0.6)]"
            >
              Agendar diagnóstico
              <span className="font-mono text-xs opacity-70">(30 min)</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#proceso"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-mono text-sm text-text/90 transition-colors hover:border-white/30 hover:bg-white/[0.04]"
            >
              Ver cómo trabajo
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          {/* Mini stack row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted/80">
            <span>Python</span>
            <span className="h-1 w-1 rounded-full bg-muted/40" />
            <span>OpenAI · Anthropic</span>
            <span className="h-1 w-1 rounded-full bg-muted/40" />
            <span>n8n</span>
            <span className="h-1 w-1 rounded-full bg-muted/40" />
            <span>Next.js</span>
            <span className="h-1 w-1 rounded-full bg-muted/40" />
            <span>Supabase</span>
            <span className="h-1 w-1 rounded-full bg-muted/40" />
            <span>Neon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
