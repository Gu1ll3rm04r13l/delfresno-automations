const CAL_URL = "https://cal.com/guillermo-ariel-del-fresno/30min";
const EMAIL = "arieldelfresno2690@gmail.com";

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#stack", label: "Stack" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-bg">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <a
              href="#hero"
              className="flex w-fit items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-text/90"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              delfresno<span className="text-muted">/automations</span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Automatizaciones con IA para PyMEs y agencias. Del prototipo al
              deploy en 7 días.
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text/90 transition-colors hover:border-white/30 hover:bg-white/[0.04]"
            >
              Agendar diagnóstico
              <span>→</span>
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted/70">
              Navegación
            </span>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-text"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted/70">
              Contacto
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="break-all font-mono text-[12px] text-muted transition-colors hover:text-text"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-text"
                >
                  Cal.com ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/delfresno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-text"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/guillermo-ariel-del-fresno/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-text"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/5 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] text-muted/70">
            © {year} Guillermo Ariel Del Fresno. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[11px] text-muted/70">
            Hecho con Next.js + Tailwind + Vercel.
          </p>
        </div>
      </div>
    </footer>
  );
}
