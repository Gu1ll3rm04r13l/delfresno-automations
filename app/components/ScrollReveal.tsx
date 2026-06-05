"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement: las secciones son visibles por defecto (SSR / no-JS).
 * Solo si hay JS y el usuario NO pidió reduce-motion, agregamos la clase
 * `has-reveal` al <html> (que activa el estado oculto inicial vía CSS) y
 * revelamos cada `[data-reveal]` al entrar en viewport. Una sola vez por elemento.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (els.length === 0) return;

    // Activá el estado oculto inicial recién ahora (evita flash si JS falla)
    document.documentElement.classList.add("has-reveal");

    if (typeof IntersectionObserver === "undefined") {
      // Sin soporte: mostramos todo
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
