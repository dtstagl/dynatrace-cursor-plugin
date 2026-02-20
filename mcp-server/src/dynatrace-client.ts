export interface DynatraceConfig {
  apiUrl: string;
  apiToken: string;
}

let cachedConfig: DynatraceConfig | undefined;

export function getConfig(): DynatraceConfig {
  if (cachedConfig) return cachedConfig;

  const apiUrl = process.env.DT_API_URL;
  const apiToken = process.env.DT_API_TOKEN;

  if (!apiUrl) {
    throw new Error(
      "DT_API_URL environment variable is required. Set it to your Dynatrace environment URL, e.g. https://abc12345.live.dynatrace.com"
    );
  }
  if (!apiToken) {
    throw new Error(
      "DT_API_TOKEN environment variable is required. Create an API token in Dynatrace under Settings → Integration → Dynatrace API."
    );
  }

  cachedConfig = { apiUrl: apiUrl.replace(/\/$/, ""), apiToken };
  return cachedConfig;
}

export async function dtFetch(
  config: DynatraceConfig,
  path: string,
  options: RequestInit = {}
): Promise<unknown> {
  const url = `${config.apiUrl}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Api-Token ${config.apiToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Dynatrace API error ${response.status}: ${body}`);
  }

  return response.json();
}
