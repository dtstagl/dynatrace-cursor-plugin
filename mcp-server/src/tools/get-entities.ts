import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getConfig, dtFetch } from "../dynatrace-client.js";

export function registerGetEntities(server: McpServer): void {
  server.tool(
    "get_entities",
    "List or search monitored entities in Dynatrace (services, hosts, processes, etc.) using an entity selector.",
    {
      entitySelector: z
        .string()
        .describe(
          "Entity selector expression, e.g. type(SERVICE), type(HOST), type(SERVICE),entityName(\"my-service\"), or entityId(SERVICE-ABCDEF1234567890)"
        ),
      from: z
        .string()
        .optional()
        .describe(
          "Start of the activity time range (ISO 8601 or relative). Defaults to now-3d."
        ),
      to: z
        .string()
        .optional()
        .describe("End of the activity time range. Defaults to now."),
      fields: z
        .string()
        .optional()
        .describe(
          "Comma-separated list of additional fields to include, e.g. +lastSeenTms,+properties,+toRelationships"
        ),
    },
    async ({ entitySelector, from, to, fields }) => {
      const config = getConfig();
      const params = new URLSearchParams();
      params.set("entitySelector", entitySelector);
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (fields) params.set("fields", fields);

      const data = await dtFetch(config, `/api/v2/entities?${params}`);

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
