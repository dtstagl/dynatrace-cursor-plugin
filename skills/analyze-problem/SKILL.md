---
name: analyze-problem
description: Analyze an active Dynatrace problem — fetch its root cause, impacted entities, and suggested remediation steps
---

# Analyze Dynatrace Problem

Use this skill to investigate an active Dynatrace problem, understand its root cause, and identify impacted services.

## Steps

1. Ask the user for the problem ID (e.g. `P-12345`) or let them describe symptoms so you can find the right problem with `get_problems`.
2. Call `get_problem` with the problem ID to retrieve:
   - Status and severity
   - Root cause entity
   - Impacted services and hosts
   - Problem duration
3. Call `get_entities` for each impacted entity to gather more context (e.g. service version, deployment events).
4. Summarize findings:
   - What is failing and why (root cause)
   - Which services / users are affected
   - How long the problem has been open
5. Suggest next steps:
   - Link to the relevant Dynatrace dashboard
   - Recommended remediation actions based on the problem category (e.g. restart service, rollback deployment, scale resources)

## Tips

- Problem IDs start with `P-` followed by digits.
- Use `affectedEntities` from the problem response to understand blast radius.
- If the problem has `evidenceDetails`, include the key evidence items in the summary.
