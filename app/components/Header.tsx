"use client";

import { useEffect, useState } from "react";

const CAL_URL = "https://cal.com/guillermo-ariel-del-fresno/30min";

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#stack", label: "Stack" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-white/5 bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 md:h-16 md:px-10">
        <a
          href="#hero"
          onClick={close}
          className="group flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-text/90 transition-colors hover:text-text"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          delfresno<span className="text-muted">/automations</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-2 sm:inline-flex"
          >
            Agendar
            <span className="opacity-70">↗</span>
          </a>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-text/90 transition-colors hover:border-white/30 hover:bg-white/[0.04] md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-200 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-px w-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] h-px w-full bg-current transition-transform duration-200 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-white/5 bg-bg/95 backdrop-blur-md transition-[max-height] duration-300 ease-out md:hidden ${
          open ? "max-h-[480px]" : "max-h-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="rounded-md px-2 py-3 font-mono text-[13px] uppercase tracking-[0.14em] text-muted transition-colors hover:bg-white/[0.03] hover:text-text"
            >
              {l.label}
            </a>
          ))}
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-2 sm:hidden"
          >
            Agendar diagnóstico
            <span className="opacity-70">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
