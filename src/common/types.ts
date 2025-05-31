// Text analytics

export type TextAnalyticsAnswer = {
  id: string;
  question: string;
  reasoning: string;
  response: string;
  utterance: string;
};

export type TextAnalyticsResponse = {
  request_id?: string;
  answers?: TextAnalyticsAnswer[];
};

// Text translate

export type TextTranslateResponse = {
  request_id?: string;
  translated_text: string;
  source_language_code: string;
};

// Language identification

export type LanguageIdentificationResponse = {
  request_id?: string;
  language_code?: string;
  script_code?: string;
};

// Transliteration

export type TransliterateResponse = {
  request_id?: string;
  transliterated_text: string;
  source_language_code: string;
};
