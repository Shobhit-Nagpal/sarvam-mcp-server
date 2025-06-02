import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { VERSION } from "./common/version.js";
import { LanguageIdentificationSchema } from "./operations/language-identification.js";
import { sarvamRequest } from "./common/api.js";
import {
  LanguageIdentificationResponse,
  TextAnalyticsResponse,
  TextTranslateResponse,
  TransliterateResponse,
} from "./common/types.js";
import { SARVAM_ENDPOINTS } from "./common/endpoints.js";
import {
  createToolResponse,
  formatLanguageIdentification,
  formatTextAnalytics,
  formatTranslateText,
  formatTransliterateText,
} from "./common/utils.js";
import { TextAnalyticsSchema } from "./operations/text-analytics.js";
import { TextTranslateSchema } from "./operations/text-translate.js";
import { TransliterateSchema } from "./operations/transliterate.js";

const server = new McpServer(
  {
    name: "sarvam-server",
    version: VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Define available tools

server.tool(
  "language-identification",
  "Identifies the language (e.g., en-IN, hi-IN) and script (e.g., Latin, Devanagari) of the input text, supporting multiple languages.",
  LanguageIdentificationSchema.shape,
  async ({ input }) => {
    const languageIdentification =
      await sarvamRequest<LanguageIdentificationResponse>(
        SARVAM_ENDPOINTS.LanguageIdentification,
        {
          method: "POST",
          body: JSON.stringify({ input }),
        },
      );

    if (!languageIdentification) {
      return createToolResponse(
        "Failed to retrieve language identification data",
      );
    }

    const formattedLanguageIdentification = formatLanguageIdentification(
      languageIdentification,
    );

    return createToolResponse(formattedLanguageIdentification);
  },
);

server.tool(
  "text-analytics",
  "Comprehensive text analysis on provided content and answers specific questions about the text.",
  TextAnalyticsSchema.shape,
  async ({ text, questions }) => {
    const textAnalytics = await sarvamRequest<TextAnalyticsResponse>(
      SARVAM_ENDPOINTS.TextAnalytics,
      {
        method: "POST",
        body: JSON.stringify({ text, questions }),
      },
    );

    if (!textAnalytics) {
      return createToolResponse("Failed to retrieve text analytics data");
    }

    const answers = textAnalytics.answers || [];

    if (answers.length === 0) {
      return createToolResponse("No answers for the provided text");
    }

    const formattedTextAnalytics = formatTextAnalytics({
      request_id: textAnalytics.request_id,
      answers,
    });

    return createToolResponse(formattedTextAnalytics);
  },
);

server.tool(
  "translate-text",
  "Translation converts text from one language to another while preserving its meaning.",
  TextTranslateSchema.shape,
  async ({
    input,
    source_language_code,
    target_language_code,
    speaker_gender,
    mode,
    model,
    enable_processing,
    output_script,
    numerals_format,
  }) => {
    const translateText = await sarvamRequest<TextTranslateResponse>(
      SARVAM_ENDPOINTS.TranslateText,
      {
        method: "POST",
        body: JSON.stringify({
          input,
          source_language_code,
          target_language_code,
          speaker_gender,
          mode,
          model,
          enable_processing,
          output_script,
          numerals_format,
        }),
      },
    );

    if (!translateText) {
      return createToolResponse("Failed to translate text data");
    }

    const formattedTranslateText = formatTranslateText(translateText);

    return createToolResponse(formattedTranslateText);
  },
);

server.tool(
  "transliterate-text",
  "Transliteration converts text from one script to another while preserving the original pronunciation.",
  TransliterateSchema.shape,
  async ({
    input,
    source_language_code,
    target_language_code,
    numerals_format,
    spoken_form,
    spoken_form_numerals_language,
  }) => {
    const transliterateText = await sarvamRequest<TransliterateResponse>(
      SARVAM_ENDPOINTS.TransliterateText,
      {
        method: "POST",
        body: JSON.stringify({
          input,
          source_language_code,
          target_language_code,
          numerals_format,
          spoken_form,
          spoken_form_numerals_language,
        }),
      },
    );

    if (!transliterateText) {
      return createToolResponse("Failed to transliterate text data");
    }

    const formattedTransliterateText = formatTransliterateText(transliterateText);

    return createToolResponse(formattedTransliterateText);
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Namaste, duniya :)");
}

main().catch((error) => {
  console.error(`Server crashed with error: `, error);
  process.exit(1);
});
