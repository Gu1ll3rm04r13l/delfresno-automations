"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim() || undefined,
      message: String(fd.get("message") ?? "").trim(),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "No pudimos enviar el mensaje. Probá de nuevo.");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setErrorMsg("Error de red. Probá de nuevo en unos segundos.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-8 md:p-10">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            ✓ Recibido
          </span>
          <h3
            className="font-display text-2xl font-bold leading-tight md:text-3xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            Listo. Te contesto en menos de 24 hs.
          </h3>
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Si querés acelerar, podés agendar la llamada directamente:
          </p>
          <a
            href="https://cal.com/guillermo-ariel-del-fresno/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 font-mono text-sm font-medium text-white transition-colors hover:bg-accent-2"
          >
            Agendar diagnóstico (30 min) →
          </a>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-surface/40 p-6 md:p-8"
    >
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] opacity-0">
        <label>
          No completar
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Nombre" name="name" required placeholder="Ariel" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          placeholder="vos@empresa.com"
        />
      </div>

      <Field label="Empresa (opcional)" name="company" placeholder="Acme SA" />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
        >
          ¿En qué te puedo ayudar? <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Contame qué proceso te está sangrando horas. Cuanto más concreto, mejor."
          className="w-full resize-none rounded-lg border border-white/10 bg-bg/60 px-4 py-3 text-[15px] text-text placeholder:text-muted/50 transition-colors focus:border-accent/50 focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-accent/30 bg-accent/[0.06] px-4 py-3 text-sm text-text"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-sm font-medium text-white transition-all hover:bg-accent-2 hover:shadow-[0_8px_30px_-8px_rgba(230,57,70,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Enviando..." : "Enviar mensaje"}
        {!submitting && (
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <p className="font-mono text-[10px] leading-relaxed text-muted/70">
        Te respondo personalmente. Sin newsletter, sin secuencias automáticas, sin spam.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
      >
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={
          name === "email" ? "email" : name === "name" ? "name" : "off"
        }
        className="w-full rounded-lg border border-white/10 bg-bg/60 px-4 py-3 text-[15px] text-text placeholder:text-muted/50 transition-colors focus:border-accent/50 focus:outline-none"
      />
    </div>
  );
}
