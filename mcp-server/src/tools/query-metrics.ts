import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getConfig, dtFetch } from "../dynatrace-client.js";

export function registerQueryMetrics(server: McpServer): void {
  server.tool(
    "query_metrics",
    "Query time-series metrics from Dynatrace using the Metrics v2 API. Returns data points for the requested metric and time range.",
    {
      metricSelector: z
        .string()
        .describe(
          "Metric selector expression, e.g. builtin:service.response.time:avg or builtin:host.cpu.usage:max"
        ),
      from: z
        .string()
        .optional()
        .describe(
          "Start of the query time range in ISO 8601 or relative format (e.g. now-2h). Defaults to now-2h."
        ),
      to: z
        .string()
        .optional()
        .describe("End of the query time range. Defaults to now."),
      resolution: z
        .string()
        .optional()
        .describe(
          "Data resolution, e.g. 1m, 5m, 1h. If omitted, Dynatrace selects an appropriate resolution."
        ),
      entitySelector: z
        .string()
        .optional()
        .describe(
          "Entity selector to scope the metric query, e.g. type(SERVICE),entityName(\"my-service\")"
        ),
    },
    async ({ metricSelector, from, to, resolution, entitySelector }) => {
      const config = getConfig();
      const params = new URLSearchParams();
      params.set("metricSelector", metricSelector);
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (resolution) params.set("resolution", resolution);
      if (entitySelector) params.set("entitySelector", entitySelector);

      const data = await dtFetch(config, `/api/v2/metrics/query?${params}`);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  );
}
