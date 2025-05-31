import { z } from "zod";

export const BaseQuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  description: z.string().optional(),
});

export const QuestionSchema = z.discriminatedUnion("type", [
  BaseQuestionSchema.extend({
    type: z.enum(["boolean", "short answer", "long answer", "number"]),
    properties: z.record(z.any()),
  }),
  BaseQuestionSchema.extend({
    type: z.literal("enum"),
    properties: z
      .object({
        options: z.array(z.string()),
      })
      .and(z.record(z.any())),
  }),
]);

export const QuestionListSchema = z.array(QuestionSchema);

export const TextAnalyticsSchema = z.object({
  text: z.string(),
  questions: QuestionListSchema,
});

export async function performTextAnalysis(
  text: string,
  questions: z.infer<typeof QuestionListSchema>,
) {}
