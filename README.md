# dynatrace-cursor-plugin

A [Cursor plugin](https://cursor.com/docs/plugins) that brings Dynatrace observability into your AI-assisted development workflow.

## What's included

| Component | Description |
|-----------|-------------|
| **MCP Server** | Exposes Dynatrace API tools so Cursor's AI can query problems, metrics, and entities directly |
| **Skills** | Guided workflows for common Dynatrace tasks |
| **Rules** | Context-aware guidance for working with Dynatrace APIs |

### MCP Tools

| Tool | Description |
|------|-------------|
| `get_problems` | List active or recent problems, optionally filtered by status or entity |
| `get_problem` | Get full details for a specific problem (root cause, impacted entities, evidence) |
| `query_metrics` | Query time-series metrics using the Dynatrace Metrics v2 API |
| `get_entities` | Search monitored entities (services, hosts, processes) by selector |

### Skills

- **analyze-problem** — Investigate an active problem, identify root cause, and surface remediation steps
- **query-metrics** — Fetch and interpret performance metrics for any monitored entity
- **explore-service** — Get a full health overview of a Dynatrace-monitored service

## Setup

### 1. Prerequisites

- [Cursor](https://cursor.com) editor
- A Dynatrace SaaS or Managed environment
- A Dynatrace API token with the following scopes:
  - `entities.read`
  - `problems.read`
  - `metrics.read`

### 2. Install the plugin

Open Cursor and install this plugin from the Plugin Marketplace, or add it manually to your Cursor configuration.

### 3. Configure environment variables

Add the following to your Cursor MCP server environment configuration:

```json
{
  "mcpServers": {
    "dynatrace": {
      "command": "node",
      "args": ["path/to/dynatrace-cursor-plugin/mcp-server/build/index.js"],
      "env": {
        "DT_API_URL": "https://<environment-id>.live.dynatrace.com",
        "DT_API_TOKEN": "dt0c01.<your-token>"
      }
    }
  }
}
```

### 4. Build the MCP server

```bash
cd mcp-server
npm install
npm run build
```

## Development

```bash
cd mcp-server
npm install
npm run dev    # TypeScript watch mode
```

## Repository structure

```
.cursor-plugin/
  plugin.json          # Cursor plugin manifest
skills/
  analyze-problem/     # Skill: analyze a Dynatrace problem
  query-metrics/       # Skill: query Dynatrace metrics
  explore-service/     # Skill: explore a monitored service
rules/
  dynatrace-api.mdc    # API usage guidelines
  dynatrace-auth.mdc   # Authentication setup guidance
mcp-server/
  src/
    index.ts           # MCP server entry point
    dynatrace-client.ts
    tools/
      get-problems.ts
      get-problem.ts
      query-metrics.ts
      get-entities.ts
```

## License

MIT
