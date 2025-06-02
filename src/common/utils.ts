import {
  LanguageIdentificationResponse,
  TextAnalyticsAnswer,
  TextAnalyticsResponse,
  TextTranslateResponse,
  TransliterateResponse,
} from "./types.js";

/**
 * Create response for tool register callback
 */
export function createToolResponse(text: string, type = "text" as const) {
  return {
    content: [
      {
        type,
        text,
      },
    ],
  };
}

/**
 * Format response for language identification
 */
export function formatLanguageIdentification(
  res: LanguageIdentificationResponse,
) {
  return [
    `Request ID: ${res.request_id}`,
    `Script Code: ${res.script_code}`,
    `Language Code: ${res.language_code}`,
  ].join("\n");
}

/**
 * Format response for text analytics
 */
export function formatTextAnalytics(res: TextAnalyticsResponse) {
  // We are already filtering the condition that answers can be undefined or empty
  const formattedAnswers = res.answers!.map(formatTextAnalyticsAnswer);

  return [`Request ID: ${res.request_id}`, `Answers: ${formattedAnswers}`].join(
    "\n",
  );
}

/**
 * Format answer field under text analytics
 */
export function formatTextAnalyticsAnswer(answer: TextAnalyticsAnswer) {
  return [
    `ID: ${answer.id}`,
    `Question: ${answer.question}`,
    `Response: ${answer.response}`,
    `Reasoning: ${answer.reasoning}`,
    `Utterance: ${answer.utterance}`,
  ].join("\n");
}

/**
 * Format response for text translate
 */
export function formatTranslateText(res: TextTranslateResponse) {
  return [
    `Request ID: ${res.request_id}`,
    `Source code language: ${res.source_language_code}`,
    `Translated text: ${res.translated_text}`,
  ].join("\n");
}

/**
 * Format response for text transliteration
 */
export function formatTransliterateText(res: TransliterateResponse) {
  return [
    `Request ID: ${res.request_id}`,
    `Source code language: ${res.source_language_code}`,
    `Transliterated text: ${res.transliterated_text}`,
  ].join("\n");
}
