import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerGetProblems } from "./tools/get-problems.js";
import { registerGetProblem } from "./tools/get-problem.js";
import { registerQueryMetrics } from "./tools/query-metrics.js";
import { registerGetEntities } from "./tools/get-entities.js";

const server = new McpServer({
  name: "dynatrace",
  version: "0.1.0",
});

// Register all tools
registerGetProblems(server);
registerGetProblem(server);
registerQueryMetrics(server);
registerGetEntities(server);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
