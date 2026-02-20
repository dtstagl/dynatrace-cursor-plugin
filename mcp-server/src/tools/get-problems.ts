import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getConfig, dtFetch } from "../dynatrace-client.js";

export function registerGetProblems(server: McpServer): void {
  server.tool(
    "get_problems",
    "List active or recent problems in the Dynatrace environment. Returns problem ID, title, severity, status, and impacted entities.",
    {
      status: z
        .enum(["OPEN", "RESOLVED"])
        .optional()
        .describe("Filter by problem status. Defaults to OPEN."),
      from: z
        .string()
        .optional()
        .describe(
          "Start of the query time range in ISO 8601 or relative format (e.g. now-24h). Defaults to now-2h."
        ),
      to: z
        .string()
        .optional()
        .describe("End of the query time range. Defaults to now."),
      entitySelector: z
        .string()
        .optional()
        .describe(
          "Entity selector to filter problems by affected entity, e.g. type(SERVICE),entityName(\"my-service\")"
        ),
    },
    async ({ status, from, to, entitySelector }) => {
      const config = getConfig();
      const params = new URLSearchParams();
      params.set("problemSelector", `status(${status ?? "OPEN"})`);
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (entitySelector) params.set("entitySelector", entitySelector);

      const data = await dtFetch(config, `/api/v2/problems?${params}`);

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
