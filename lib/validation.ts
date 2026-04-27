import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nombre muy corto").max(120),
  email: z.string().trim().toLowerCase().email("Email inválido").max(200),
  company: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  message: z.string().trim().min(10, "Contame un poco más").max(4000),
  // Honeypot: el campo debe llegar vacío. Si trae algo, es bot.
  website: z
    .string()
    .max(0, "honeypot")
    .optional()
    .or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
