import envManager from "./env.js";
import { createSarvamError } from "./error.js";

export const SARVAM_BASE_URL = "https://api.sarvam.ai";

const USER_AGENT = "sarvam-mcp/1.0";

type RequestOpts = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

export async function sarvamRequest<T>(
  endpoint: string,
  options: RequestOpts = {},
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT,
    ...options.headers,
  };

  if (envManager.getSarvamAPIKey()) {
    headers["api-subscription-key"] = envManager.getSarvamAPIKey();
  }

  try {
    const res = await fetch(`${SARVAM_BASE_URL}/${endpoint}`, {
      method: options.method || "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      throw createSarvamError(res.status, res);
    }

    const data: T = await res.json();

    return data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
