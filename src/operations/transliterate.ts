import { z } from "zod";

export const TransliterateSchema = z.object({
  input: z.string().max(1000),
  source_language_code: z.enum([
    "auto",
    "en-IN",
    "hi-IN",
    "bn-IN",
    "gu-IN",
    "kn-IN",
    "ml-IN",
    "mr-IN",
    "od-IN",
    "pa-IN",
    "ta-IN",
    "te-IN",
  ]),
  target_language_code: z.enum([
    "en-IN",
    "hi-IN",
    "bn-IN",
    "gu-IN",
    "kn-IN",
    "ml-IN",
    "mr-IN",
    "od-IN",
    "pa-IN",
    "ta-IN",
    "te-IN",
  ]),
  numerals_format: z.enum(["international", "native"]).optional(),
  spoken_form_numerals_language: z
    .enum(["english", "native"])
    .optional()
    .default("native"),
  spoken_form: z.boolean().optional().default(false),
});
