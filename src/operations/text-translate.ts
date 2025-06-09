import { z } from "zod";

export const TextTranslateSchema = z.object({
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
  speaker_gender: z.enum(["Male", "Female"]).optional(),
  mode: z
    .enum(["formal", "modern-colloquial", "classic-colloquial", "code-mixed"])
    .optional(),
  model: z.enum(["mayura:v1"]).optional().default("mayura:v1"),
  enable_processing: z.boolean().optional().default(false),
  output_script: z
    .enum(["roman", "fully-native", "spoken-form-in-native"])
    .optional(),
  numerals_format: z.enum(["international", "native"]).optional(),
});
