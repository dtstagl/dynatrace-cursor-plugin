---
name: explore-service
description: Explore a Dynatrace-monitored service — retrieve its health, dependencies, and recent events
---

# Explore Dynatrace Service

Use this skill to get a comprehensive overview of a monitored service in Dynatrace.

## Steps

1. Ask the user for the service name or entity ID.
2. Call `get_entities` with `entitySelector=type(SERVICE),entityName("<name>")` to find the service.
3. With the service entity ID, gather:
   - Current health status and SLO compliance
   - Response time and error rate using `query_metrics`
   - Active problems via `get_problems` filtered by entity
4. Present a service health summary:
   - Status (healthy / degraded / critical)
   - Key performance indicators (P50/P95 response time, error rate, throughput)
   - Open problems or alerts
   - Recent deployment events (if available)
5. Offer drill-down options:
   - View upstream/downstream service dependencies
   - Analyze a specific open problem
   - Query a specific metric in detail

## Tips

- Entity IDs follow the pattern `SERVICE-<hex>` (e.g. `SERVICE-1234ABCD5678EF90`).
- Use `toRelationships` and `fromRelationships` in the entity response to map service dependencies.
- Combine with the `analyze-problem` skill for deeper root cause analysis.
