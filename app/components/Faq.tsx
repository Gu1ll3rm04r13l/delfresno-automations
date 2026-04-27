"use client";

import { useState } from "react";

type Item = { q: string; a: string };

const ITEMS: Item[] = [
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Depende del alcance. La auditoría inicial es gratis y termina con una estimación clara: rango de horas, costo total y qué obtenés. Sin honorarios por hora ocultos ni sorpresas a fin de mes.",
  },
  {
    q: "¿Cuánto tiempo lleva ver algo funcionando?",
    a: "Prototipo en 7 días sobre tus datos reales. Si no convence en esa demo, no seguimos. Integración a producción suma 1–2 semanas más, dependiendo de los sistemas que haya que conectar.",
  },
  {
    q: "¿Y si no funciona?",
    a: "Si en la auditoría no veo cómo darte impacto real, te lo digo. Si el prototipo no convence, no avanzamos a integración. Trabajo por checkpoints justamente para no quemarte plata en algo que no te sirve.",
  },
  {
    q: "¿Necesito tener mis datos ya organizados?",
    a: "No. Parte del trabajo es justamente eso: extraer datos de PDFs, mails, planillas dispersas, o lo que tengas. Si tu data está caótica, mejor — ahí es donde más valor agrega automatizar.",
  },
  {
    q: "¿Mis datos son privados?",
    a: "Sí. Trabajo con providers que ofrecen modo zero-retention (OpenAI, Anthropic) y deploys en tu región si hace falta. Firmamos NDA antes de que me pases nada sensible.",
  },
  {
    q: "¿Qué pasa después del deploy?",
    a: "Soporte mensual opcional: mantenimiento, ajuste de prompts, métricas y mejoras. Sin contratos atados. Te quedás cuando agrega valor; si en algún momento no, paramos.",
  },
  {
    q: "¿Trabajás solo?",
    a: "Sí. Soy freelancer, no agencia. Eso significa: hablás siempre conmigo, no con un account manager que después transfiere a un junior. Para proyectos más grandes, sumo colegas de confianza con tu OK previo.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-surface/40">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={i !== ITEMS.length - 1 ? "border-b border-white/5" : ""}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.02] md:px-7 md:py-6"
            >
              <span className="font-mono text-[11px] text-accent/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display text-base font-medium leading-tight md:text-lg">
                {item.q}
              </span>
              <span
                aria-hidden
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/10 font-mono text-sm transition-transform ${
                  isOpen ? "rotate-45 border-accent/40 text-accent" : "text-muted"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 pl-[60px] text-[14px] leading-relaxed text-muted md:px-7 md:pb-8 md:pl-[76px] md:text-[15px]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
