---
name: query-metrics
description: Query Dynatrace metrics for a service or entity and interpret the results
---

# Query Dynatrace Metrics

Use this skill to fetch time-series metrics from Dynatrace and help the user understand performance trends.

## Steps

1. Ask the user which metric they want to query (e.g. `builtin:service.response.time`, `builtin:host.cpu.usage`).
   - If unsure, suggest common metrics based on the entity type (service, host, process).
2. Ask for the entity ID or name to scope the query, and the time range (default: last 2 hours).
3. Call `query_metrics` with:
   - `metricSelector`: the metric key, e.g. `builtin:service.response.time:avg`
   - `resolution`: appropriate resolution (`1m`, `5m`, `1h`)
   - `from`: start time (ISO 8601 or relative, e.g. `now-2h`)
   - `to`: end time (default: `now`)
   - `entitySelector`: optional filter, e.g. `type(SERVICE),entityName("my-service")`
4. Present the results as a table or trend summary:
   - Min, max, average values
   - Notable spikes or drops
5. Offer to compare against a baseline or alert threshold if the user provides one.

## Common Metrics

| Entity Type | Metric Key | Description |
|-------------|-----------|-------------|
| Service | `builtin:service.response.time` | Response time (µs) |
| Service | `builtin:service.errors.total.rate` | Error rate (%) |
| Service | `builtin:service.requestCount.total` | Request throughput |
| Host | `builtin:host.cpu.usage` | CPU usage (%) |
| Host | `builtin:host.mem.usage` | Memory usage (%) |
| Process | `builtin:tech.generic.cpu.usage` | Process CPU (%) |

## Tips

- Use `avg`, `max`, `min`, `sum` aggregations by appending `:avg` to the metric selector.
- The `resolution` parameter controls data granularity — use finer resolution for short time ranges.
