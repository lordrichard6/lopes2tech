## Lite — CHF 149/mo

**Who it fits:** stable automations with low change rate.

### SLA
- **Response:** within 1 business day.
- **Uptime monitoring:** hourly checks.
- **Hotfix window:** next business day.

### Included
- 1 hour/month of tweaks or support.
- Monitoring: workflow health, error rates, vendor quotas.
- Alerts: email on failure, retry policy, dead-letter queue review.
- Logs dashboard (Sheets/Notion) with last 30 days.
- Monthly sanity check of keys, webhooks, and permissions.

### Typical tasks covered
- Edit message copy or timing.
- Add/rename 1–2 CRM fields.
- Fix a broken mapping after a vendor UI change.
- Reconnect an expired OAuth token.

### Overage
- CHF 140/h, billed in 30-min blocks.

### Not included
New workflows, major refactors, data migrations, creative copywriting, multi-system rollouts.

---

## Pro — CHF 299/mo

**Who it fits:** active teams, monthly iterations, small enhancements.

### SLA
- **Response:** within 8 business hours.
- **Uptime monitoring:** every 15 minutes.
- **Hotfix window:** same business day for P1.

### Included
- 3 hours/month of tweaks or support.
- Everything in Lite.
- Monthly report: volume, failure causes, top saved hours, next actions.
- Minor edits to flows (≤5 nodes changed) or one small step added.
- A/B test on one outbound message or timing.
- Quarterly key rotation check.

### Typical tasks covered
- Add a WhatsApp step after form submit.
- Add 1 new small trigger (e.g., booking canceled → tag contact).
- Adjust no-show timings and copy.
- Build one KPI chart in the report.

### Overage
- CHF 135/h, 30-min blocks.

### Not included
New products or channels, multi-environment CI/CD, large schema changes.

---

## Scale — CHF 699/mo

**Who it fits:** multiple automations, steady change, data volumes.

### SLA
- **Response:** within 4 business hours.
- **Uptime monitoring:** 5-minute checks.
- **Hotfix window:** within 4 business hours for P1.

### Included
- 8 hours/month of tweaks or support.
- Everything in Pro.
- Priority queue and expedited hotfixes.
- Advanced tuning: retries, backoff, rate limits, idempotency keys.
- Quarterly roadmap session (45 min).
- Two A/B tests running in parallel.
- Staging environment sync and smoke tests.
- Vendor quota and cost optimization review.

### Typical tasks covered
- Add a new micro-flow each month (e.g., deal won → invoice + email).
- Build a weekly PDF KPI with GPT insights.
- Implement dedupe rules for a CRM object.
- Train team on new flow (30-min Loom + checklists).

### Overage
- CHF 130/h, 30-min blocks.

### Not included
Net-new complex projects, custom apps, long data migrations.

---

## What counts as a “tweak” vs “new feature”

- **Tweak (covered):** adjust fields, change timings, swap a template, add one small node or filter, reconnect a token, minor mapping fixes.
- **New feature (separately quoted):** new trigger, new external system, multi-step flow, database schema, or anything needing scoping and UAT.

## Fair-use guardrails
- Hours don’t roll over.
- One concurrent change request at a time per plan.
- Each request scoped to ≤2 iterations; further revisions use included hours or overage.

## Incident classes
- **P1 (hard down, data loss risk):** hotfix within SLA. Post-mortem summary next day.
- **P2 (degraded, retries working):** scheduled within 1 business day.
- **P3 (cosmetic/minor):** queued next available slot.

## Onboarding once
- **Access:** client-owned accounts for OpenAI, WhatsApp/Twilio, CRM, Calendly, n8n/Make.
- **Runbook:** credentials vault, env map, rollback steps, alert recipients.
- **Observability:** one health check per workflow, error store + DLQ.
- **Security:** least-privilege tokens, quarterly review.

## Reporting (Pro/Scale)
- Volume by workflow, success/fail %, top error signatures.
- Vendor costs snapshot and optimization suggestions.
- “Hours saved” estimate and next-best action list.

## Change request workflow
1. Client submits request with impact and deadline.
2. Triage in 24h. If tweak, schedule inside plan. If feature, quote fixed fee.
3. Implement, test with sample payloads, deploy, update runbook.
4. Confirm in production, close with short Loom.

## Upgrades, downgrades, pauses
- Upgrade anytime, pro-rate current month.
- Downgrade effective next month.
- Pause allowed once per year for up to 2 months; no rollover.

## Minimum monthly spend the client must expect
- **Without Care Plan:** vendor subs only. Typical floor CHF 10–30/month at low volume, plus per-message/token fees.
- **With Care Plan:** Lite 149, Pro 299, Scale 699, plus vendor subs.

## Two examples

**Clinic with booking reminders + no-show recovery**  
Vendors: Calendly 10, Make 10, SMS ~20 ⇒ ≈ CHF 40/mo.  
Choose Pro 299 ⇒ total ≈ CHF 339/mo.

**E-commerce with WhatsApp lead capture + FAQ bot**  
Vendors: WhatsApp API 10, Make 10, OpenAI 8 ⇒ ≈ CHF 28/mo (+ convo fees).  
Choose Scale 699 ⇒ total ≈ CHF 727/mo before usage.

