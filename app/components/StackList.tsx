"use client";

import { useState } from "react";

export type Tool = {
  name: string;
  role: string;
  group: "Lenguaje" | "LLMs" | "No-code" | "Web" | "Infra";
  featured?: boolean;
};

const TOOLS: Tool[] = [
  { name: "Python", role: "Pipelines + scripting", group: "Lenguaje", featured: true },
  { name: "OpenAI", role: "GPT + embeddings", group: "LLMs", featured: true },
  { name: "Anthropic", role: "Claude · agentes", group: "LLMs", featured: true },
  { name: "n8n", role: "Workflows", group: "No-code", featured: true },
  { name: "Next.js", role: "Web + API", group: "Web", featured: true },
  { name: "Supabase", role: "Auth + DB", group: "Infra", featured: true },
  { name: "TypeScript", role: "Frontend tipado", group: "Lenguaje" },
  { name: "LangChain", role: "Orquestación · RAG", group: "LLMs" },
  { name: "Make", role: "Integraciones SaaS", group: "No-code" },
  { name: "Zapier", role: "Triggers rápidos", group: "No-code" },
  { name: "Tailwind", role: "Design system", group: "Web" },
  { name: "Neon", role: "Postgres serverless", group: "Infra" },
  { name: "Vercel", role: "Deploy + edge", group: "Infra" },
];

export default function StackList() {
  const [expanded, setExpanded] = useState(false);
  const featured = TOOLS.filter((t) => t.featured);
  const extra = TOOLS.filter((t) => !t.featured);
  const visible = expanded ? [...featured, ...extra] : featured;

  return (
    <div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 sm:grid-cols-3">
        {visible.map((t) => (
          <div
            key={t.name}
            className="group relative flex min-h-[120px] flex-col justify-between gap-3 bg-bg p-5 transition-colors hover:bg-surface md:min-h-[140px] md:p-6"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent/80">
              {t.group}
            </span>
            <div className="flex flex-col gap-1">
              <h3
                className="font-display text-lg font-bold leading-tight md:text-xl"
                style={{ letterSpacing: "-0.025em" }}
              >
                {t.name}
              </h3>
              <p className="font-mono text-[11px] leading-relaxed text-muted">
                {t.role}
              </p>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text/85 transition-colors hover:border-white/30 hover:bg-white/[0.04]"
        >
          {expanded ? "Ver menos" : `Ver stack completo (+${extra.length})`}
          <span
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            aria-hidden
          >
            ↓
          </span>
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70">
          {visible.length} / {TOOLS.length} herramientas
        </span>
      </div>
    </div>
  );
}
