## Services V2 Playbook

> Note: Ranges target Swiss/European SMBs and mirror common chatbot/voice/automation offers. SMBs often pay 100-500 USD/month for AI chatbots, mid-market 800-5 000 USD/month, with custom builds higher.

Reference peers: sobot.io (+2), agentiveaiq.com (+2)

---

### 1) AI Customer Support Agent (chat / email / WhatsApp)

**What you sell**  
Agent that answers FAQs, tracks orders, handles basic support, and escalates edge cases.

**Pricing**
- One-time setup (per brand/site)  
  - Small business: CHF 2 000 - 3 500  
  - Mid-size: CHF 3 500 - 6 000
- Monthly retainer (support, monitoring, small tweaks): CHF 300 - 800 / month
- Plus pass-through usage costs (LLM, hosting) typically 50-200 CHF/month at SMB scale.
- Conservative vs agency builds and SaaS mid-market pricing (often 800-5 000 USD/month). Ref: sobot.io (+1)

**Implementation time**
- Discovery + design: 1-2 days
- Build flows + integrations + training data: 3-5 days
- Testing + handover: 1-2 days  
Total: 5-9 working days for an MVP.

**Tech stack**
- LLM: OpenAI (GPT-4.1 / 4.1-mini) or OpenRouter
- Orchestration: n8n (primary), Make/Zapier if client insists
- Channels: website widget (custom JS, Tidio, Crisp, Intercom), WhatsApp (Twilio / 360dialog), email (Gmail, Zoho, Zendesk, Freshdesk)
- Storage: FAQ DB or Notion/Google Sheets pulled by n8n
- Hosting: VPS (Hetzner) for n8n + Node/Python backend for chat widget if needed

---

### 2) AI Sales & Outreach / "AI SDR" Agent

**What you sell**  
Agent that researches leads, personalises cold emails, sends sequences, follows up, and books meetings.

**Pricing**
- One-time setup (playbooks, integration, templates):
  - Simple (1 ICP, email only): CHF 1 500 - 2 500
  - Advanced (email + LinkedIn + CRM sync): CHF 2 500 - 4 500
- Monthly retainer (sequence optimisation, monitoring, list refresh): CHF 400 - 1 200 / month
- Plus email sending tools / enrichment SaaS if used. Still attractive vs Copilot-style add-ons (The Verge).

**Implementation time**
- ICP & messaging workshop: 1 day
- Build sequences + n8n flows + integrations: 3-4 days
- Testing, warm-up, first campaigns: 1-2 days  
Total: 5-7 working days.

**Tech stack**
- LLM: OpenAI / OpenRouter for copy and research
- Orchestration: n8n
- Email: Google Workspace / Microsoft 365 + Mailreach, Instantly, or SMTP via n8n
- CRM: HubSpot, Pipedrive, Zoho CRM
- Enrichment: Clearbit, Apollo, Hunter (optional)
- Scheduling: Calendly or TidyCal (auto-created links)

---

### 3) AI Voice Agent (phone support / booking)

**What you sell**  
Phone agent that answers calls, qualifies, routes, and books appointments or logs tickets.

**Pricing**
- Market baseline: ~0.05-0.25 USD/min usage plus platform fees (ElevenLabs +3, Aircall +3, CloudTalk +3).
- Integrator tiers:
  - Setup simple (FAQ, routing, basic booking): CHF 2 500 - 4 000
  - Setup complex (multi-language, CRM integration, custom flows): CHF 4 000 - 7 000
  - Monthly retainer: CHF 300 - 1 000 / month (monitoring, tuning, intents)
  - Plus pass-through call minutes.

**Implementation time**
- Call flows + prompts + scripting: 2-3 days
- Integration & testing (Twilio, Calendly, CRM): 3-5 days  
Total: 5-8 working days.

**Tech stack**
- Telco + Voice: Twilio, Retell, Telnyx, or similar AI voice platforms (retellai.com +1)
- LLM: provider built-in or OpenAI/OpenRouter via webhooks
- Orchestration: n8n (voice provider webhook -> logic -> provider)
- Calendars/bookings: Calendly, Google Calendar, clinic systems
- CRM/Ticketing: create leads, tickets, or tasks per call

---

### 4) AI Knowledge-Base / Internal Helpdesk Agent (RAG)

**What you sell**  
"Ask your company" bot answering from internal documents, SOPs, policies, and ticket history using RAG.

**Pricing**
- Enterprise RAG projects often reach tens of thousands; even SMB builds justify higher fees (Medium +2, agentiveaiq.com +2).
- SMB / mid-market:
  - Single source (Notion or Google Drive, few hundred docs): CHF 3 000 - 5 000
  - Multi-source (Drive + Notion + CRM + ticketing) with access control: CHF 5 000 - 9 000
  - Monthly retainer: CHF 400 - 1 200 / month (monitoring, retraining, index upkeep)
  - Vector DB + LLM usage: usually 50-300 CHF/month at modest volume.

**Implementation time**
- Data audit & structure: 2-3 days
- Ingestion + embedding + search: 3-5 days
- UI (chat, Slack, Teams) + testing: 2-3 days  
Total: 7-11 working days.

**Tech stack**
- LLM: OpenAI for answers, cheaper models for embeddings/classification
- Vector DB: Pinecone, Qdrant, or pgvector (Postgres) (Medium +1)
- Orchestration: n8n for ingestion and RAG pipelines (cron sync, HTTP endpoints)
- Embeddings: OpenAI, Cohere, or Voyage
- Connectors: Google Drive, Notion, Confluence, Zendesk, etc.
- Frontend: Slack/Teams bot internally; simple React/Next chat widget or existing help center externally

---

### 5) AI Workflow & Back-Office Automation Agents

**What you sell**  
Agents that watch events (new lead, invoice, form submission, email) and run multi-step flows: enrich data, update CRM, generate documents, send emails, create tasks, etc.

**Pricing**
- Automation consultancies charge several thousand per implementation plus retainers (parseur.com +3, zapier.com +3, DOIT +3).
- Per "automation pack" (2-5 workflows):
  - Simple pack (lead -> CRM -> Slack -> email): CHF 1 500 - 3 000
  - Advanced pack (multi-system, error handling, AI steps): CHF 3 000 - 5 000
  - Monthly retainer: CHF 250 - 800 / month (monitoring, tweaks, incremental workflows)

**Implementation time**
- Mapping processes + design: 1-2 days
- Build flows in n8n + tests: 3-6 days
- Documentation & handover: 1 day  
Total: 5-9 working days per pack.

**Tech stack**
- Orchestration: n8n (core). Make / Zapier only if client already uses them.
- LLM: for smart steps (classify ticket, summarise emails, generate replies)
- Data sources: Google Sheets, SQL, CRM, ERP, accounting (Xero, Bexio, etc.)
- Channels: Email, Slack/Teams, SMS/WhatsApp, project management tools

---

### How to Position This to Clients

- Always sell as "project + care plan"
- Project fee pays back in 1-3 months of saved labour
- Care plan keeps the agent accurate, monitored, and improved
- Anchor on business outcome (time saved, calls handled, meetings booked) rather than hours
- Bundle multiple agents for larger tickets  
  Example: Support chatbot + RAG knowledge base + automations -> CHF 8 000 - 15 000 project + 900-1 800 CHF/month care

