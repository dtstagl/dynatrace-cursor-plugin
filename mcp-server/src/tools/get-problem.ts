import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getConfig, dtFetch } from "../dynatrace-client.js";

export function registerGetProblem(server: McpServer): void {
  server.tool(
    "get_problem",
    "Get detailed information about a specific Dynatrace problem by its ID, including root cause, impacted entities, and evidence.",
    {
      problemId: z
        .string()
        .describe("The Dynatrace problem ID, e.g. P-12345."),
    },
    async ({ problemId }) => {
      const config = getConfig();
      const data = await dtFetch(
        config,
        `/api/v2/problems/${encodeURIComponent(problemId)}`
      );

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
