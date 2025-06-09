import { z } from "zod";

export const LanguageIdentificationSchema = z.object({
  input: z.string(),
});
