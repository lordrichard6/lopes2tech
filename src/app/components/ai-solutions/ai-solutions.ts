import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MeetingSectionComponent } from '../meeting-section/meeting-section';

interface IndustryCopy {
  problem: string;
  solution: string;
}

interface AIService {
  id: number;
  title: string;
  baseProblem: string;
  baseSolution: string;
  industryCopy?: Record<string, IndustryCopy>;
  price: string;
  time: string;
  triggers?: string;
  actions?: string;
  tools?: string;
}

interface Package {
  name: string;
  price: string;
  description: string;
}

interface Industry {
  label: string;
  value: string;
}

@Component({
  selector: 'app-ai-solutions',
  standalone: true,
  imports: [CommonModule, MeetingSectionComponent],
  templateUrl: './ai-solutions.html',
  styleUrl: './ai-solutions.scss',
  animations: [
    trigger('industrySwitch', [
      transition('* => *', [
        query(
          '.service-card',
          [
            style({
              opacity: 0,
              transform: 'translateY(18px) scale(0.96)',
              filter: 'blur(6px)',
            }),
            stagger(
              80,
              animate(
                '420ms cubic-bezier(0.26, 0.84, 0.4, 1.18)',
                keyframes([
                  style({
                    opacity: 0.45,
                    transform: 'translateY(10px) scale(0.98)',
                    filter: 'blur(3px)',
                    offset: 0.35,
                  }),
                  style({
                    opacity: 1,
                    transform: 'translateY(-6px) scale(1.02)',
                    filter: 'blur(0)',
                    offset: 0.7,
                  }),
                  style({
                    opacity: 1,
                    transform: 'translateY(0) scale(1)',
                    filter: 'blur(0)',
                    offset: 1,
                  }),
                ])
              )
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ]
})
export class AISolutionsComponent {
  industries: Industry[] = [
    { label: 'Clinics & Therapists', value: 'clinics' },
    { label: 'Dentists & Beauty', value: 'dentists' },
    { label: 'Construction & Trades', value: 'construction' },
    { label: 'Agencies', value: 'agencies' },
    { label: 'E-commerce', value: 'ecommerce' },
    { label: 'Real Estate', value: 'realestate' },
    { label: 'Hospitality', value: 'hospitality' },
    { label: 'Professional Services', value: 'services' }
  ];

  selectedIndustry = this.industries[0].value;

  services: AIService[] = [
    {
      id: 1,
      title: 'Lead Capture Automation',
      baseProblem: 'New enquiries sit too long without a reply, so hot leads cool down.',
      baseSolution: 'Capture every lead automatically and message them instantly via WhatsApp, SMS, and email.',
      price: 'CHF 900–1,600',
      time: '1–2 days',
      triggers: 'Tally/Typeform/Google Form, Facebook Lead Ads',
      actions: 'dedupe in HubSpot/Zoho, assign owner, send WhatsApp/SMS and email, create task, log UTM',
      tools: 'n8n/Make, HubSpot/Zoho, 360dialog/Twilio, Gmail',
      industryCopy: {
        clinics: {
          problem: 'Patients complete intake forms but no one replies quickly, so they book another clinic.',
          solution: 'Send an immediate WhatsApp/SMS greeting, create the patient in your system, and prompt staff to book the consult.'
        },
        dentists: {
          problem: 'Cosmetic enquiries wait hours for a call back and switch to a different practice.',
          solution: 'Auto-send a friendly WhatsApp, drop the lead into your CRM, and alert the treatment coordinator instantly.'
        },
        construction: {
          problem: 'Homeowners requesting quotes hear nothing for days, so they hire a different contractor.',
          solution: 'Log the lead, text them a thanks with next steps, and notify your estimator straight away.'
        },
        agencies: {
          problem: 'Campaign enquiries pile up in inboxes; by the time you answer, the budget moved elsewhere.',
          solution: 'Enrich the lead, message them immediately, and assign the account manager with full UTM context.'
        },
        ecommerce: {
          problem: 'Giveaway forms collect emails but nobody nudges shoppers to buy.',
          solution: 'Send an instant WhatsApp/SMS offer and add the contact to your Klaviyo/CRM flow.'
        }
      }
    },
    {
      id: 2,
      title: 'Booking Reminder Workflow',
      baseProblem: 'Clients forget their booking and simply do not show up.',
      baseSolution: 'Send smart reminders, easy reschedule links, and follow-ups when someone misses an appointment.',
      price: 'CHF 800–1,400',
      time: '1–2 days',
      triggers: 'Calendly/Cal.com booking',
      actions: 'email + WhatsApp reminders, reschedule link, post-no-show sequence, CRM update',
      industryCopy: {
        clinics: {
          problem: 'Therapy clients miss sessions because they forget the time or link.',
          solution: 'Send WhatsApp reminders, share telehealth links, and follow up to rebook no-shows automatically.'
        },
        dentists: {
          problem: 'Patients skip hygiene appointments and hygiene chairs sit empty.',
          solution: 'Send friendly reminders, offer one-click reschedules, and alert staff if someone still misses the slot.'
        },
        construction: {
          problem: 'Site surveys get missed because homeowners forget the visit.',
          solution: 'Send SMS reminders with map links and notify your crew if the homeowner cancels or no-shows.'
        },
        agencies: {
          problem: 'Discovery calls are missed, wasting prep time.',
          solution: 'Send branded reminders, calendar links, and automatic follow-ups to rebook prospects.'
        },
        ecommerce: {
          problem: 'Virtual styling or demo calls often get skipped.',
          solution: 'Send reminders with product teasers and quick reschedule options to keep shoppers engaged.'
        }
      }
    },
    {
      id: 3,
      title: 'Quotes & Invoices Automation',
      baseProblem: 'Manual quoting and invoicing slows cash flow and introduces mistakes.',
      baseSolution: 'Create and send invoices automatically when a deal is won, and reconcile payments without manual work.',
      price: 'CHF 1,100–1,900',
      time: '2–3 days',
      triggers: 'deal moves to "Won"',
      actions: 'generate invoice in Stripe/Zoho Books, email PDF, payment link, reconcile on payment',
      industryCopy: {
        clinics: {
          problem: 'Therapy packages are sold but invoices are sent days later, delaying treatment start.',
          solution: 'Generate the care plan invoice instantly, email it with payment links, and mark it paid automatically.'
        },
        dentists: {
          problem: 'Cosmetic treatment plans need manual quotes and follow-up calls to take deposits.',
          solution: 'Create the treatment estimate, email or text the PDF, and collect the deposit via Stripe immediately.'
        },
        construction: {
          problem: 'Project bids, deposits, and progress invoices are tracked in spreadsheets.',
          solution: 'Auto-build the estimate, send it with acceptance and payment links, and update your job costing tool.'
        },
        agencies: {
          problem: 'Retainer invoices are sent late so revenue recognition slips.',
          solution: 'Issue the invoice as soon as a deal is marked “won” and chase payment automatically.'
        },
        ecommerce: {
          problem: 'Wholesale orders require manual pro-forma invoices and payment tracking.',
          solution: 'Create and send the invoice automatically with online payment and sync the order status when paid.'
        }
      }
    },
    {
      id: 4,
      title: 'FAQ Chatbot (Web & WhatsApp)',
      baseProblem: 'Customers keep asking the same questions and wait for slow replies.',
      baseSolution: 'Give them an AI chatbot that answers instantly, passes complex chats to humans, and logs leads.',
      price: 'CHF 1,500–2,500',
      time: '3–5 days',
      triggers: 'Input: a Notion or Google Doc knowledge base',
      actions: 'GPT answer with sources, handoff to human, log leads in CRM',
      tools: 'n8n + OpenAI, Notion, 360dialog/Twilio',
      industryCopy: {
        clinics: {
          problem: 'Patients ask about insurance, waitlists, and session types, filling up the phone lines.',
          solution: 'Let the chatbot answer routine questions, share intake forms, and alert staff when a human touch is needed.'
        },
        dentists: {
          problem: 'Patients message about whitening or implant pricing at all hours.',
          solution: 'Provide instant answers, share before/after galleries, and book consultations when they are ready.'
        },
        construction: {
          problem: 'Homeowners repeatedly ask about services, coverage areas, and permit steps.',
          solution: 'Answer FAQs automatically, collect project details, and hand qualified leads to your sales team.'
        },
        agencies: {
          problem: 'Prospects want to know minimum retainers, processes, and timelines before booking a call.',
          solution: 'Deliver polished answers, share relevant case studies, and capture the lead directly into your CRM.'
        },
        ecommerce: {
          problem: 'Shoppers ask about shipping, returns, and sizing and abandon carts while waiting.',
          solution: 'Reply immediately, surface the right products, and escalate to a human when a sale is on the line.'
        }
      }
    },
    {
      id: 5,
      title: 'AI Email Triage Assistant',
      baseProblem: 'The support inbox is overflowing and nobody knows which email to answer first.',
      baseSolution: 'Classify, summarise, and label emails automatically, then draft the first reply for your team.',
      price: 'CHF 900–1,600',
      time: '1–2 days',
      triggers: 'inbound to support@',
      actions: 'classify, summarize, urgency label, create ticket in Notion/Jira/HubSpot, draft reply',
      industryCopy: {
        clinics: {
          problem: 'Admins dig through inboxes for urgent patient messages and miss important updates.',
          solution: 'Flag urgent clinical emails, summarise the rest, and suggest replies for quick approval.'
        },
        dentists: {
          problem: 'Treatment enquiries, insurance queries, and lab updates all混 in one inbox.',
          solution: 'Sort messages by urgency, draft friendly replies, and push tasks to your practice software.'
        },
        construction: {
          problem: 'Jobsite updates, supplier quotes, and client approvals are buried in email threads.',
          solution: 'Tag emails by project, create tasks in your PM tool, and highlight the critical ones for the PM.'
        },
        agencies: {
          problem: 'Client requests and approvals are lost in shared inboxes.',
          solution: 'Summarise each client email, prioritise urgent items, and create tickets in your task board.'
        },
        ecommerce: {
          problem: 'Support@ is flooded with order questions and returns.',
          solution: 'Categorise by topic, draft answer templates, and create support tickets for tricky cases.'
        }
      }
    },
    {
      id: 6,
      title: 'Contract Automation Flow',
      baseProblem: 'Building contracts manually takes time and risks costly mistakes.',
      baseSolution: 'Generate the contract automatically, send it for e-signature, and file it where everyone can find it.',
      price: 'CHF 1,100–1,900',
      time: '2–3 days',
      triggers: 'client fills short form',
      actions: 'GPT fills template, creates PDF, sends for e-signature, stores in Drive, links in CRM',
      tools: 'n8n, OpenAI, Google Docs, PDF, SignRequest/DocuSign',
      industryCopy: {
        clinics: {
          problem: 'Therapy agreements are built manually and often come back unsigned.',
          solution: 'Generate tailored agreements instantly, send them for e-signature, and store them in the EMR.'
        },
        dentists: {
          problem: 'Cosmetic consent forms are copied and pasted for each patient.',
          solution: 'Fill the consent with patient details, send it for signature, and save it with the treatment plan.'
        },
        construction: {
          problem: 'Project contracts are edited in Word each time, creating version chaos.',
          solution: 'Merge client data, send for signature, and sync the signed contract to your job folder automatically.'
        },
        agencies: {
          problem: 'Retainer agreements need legal review every time, delaying onboarding.',
          solution: 'Create the contract from form inputs, route it for signing, and drop it into the client workspace.'
        },
        ecommerce: {
          problem: 'Wholesale agreements and NDAs are handled manually and lost in email threads.',
          solution: 'Auto-generate the document, collect signatures, and link it to the customer profile instantly.'
        }
      }
    },
    {
      id: 7,
      title: 'Reputation Booster Automation',
      baseProblem: 'You only ask for reviews occasionally, so happy customers stay silent.',
      baseSolution: 'Request reviews automatically, celebrate the five-stars, and intercept the bad ones before they go public.',
      price: 'CHF 700–1,200',
      time: '1 day',
      triggers: 'job closed in CRM',
      actions: 'request Google review, if 4–5★ publish, if ≤3★ open internal ticket, weekly report',
      industryCopy: {
        clinics: {
          problem: 'Great patient experiences go unreviewed, so the clinic looks quiet online.',
          solution: 'Ask for a review after each successful visit, publish five-stars, and alert staff to follow up on anything lower.'
        },
        dentists: {
          problem: 'Smile makeover patients love the results but rarely leave feedback.',
          solution: 'Send a personalised review request with photo reminders and escalate negative feedback internally.'
        },
        construction: {
          problem: 'Completed projects don\'t turn into testimonials, so new clients waver.',
          solution: 'Text the homeowner when the job closes, publish the five-star response, and open a ticket if it\'s below four.'
        },
        agencies: {
          problem: 'Clients praise you privately but your Google profile looks empty.',
          solution: 'Trigger review requests when campaigns launch successfully and route low scores to the account lead.'
        },
        ecommerce: {
          problem: 'Happy shoppers don\'t leave reviews, so products look unproven.',
          solution: 'Send requests after delivery, reward five-stars, and notify support if someone is unhappy.'
        }
      }
    },
    {
      id: 8,
      title: 'CRM Data Hygiene Bot',
      baseProblem: 'Your CRM gets messy fast — duplicates, bad phone numbers, missing fields.',
      baseSolution: 'Run a nightly clean-up that merges duplicates, fixes data, and flags gaps for the team.',
      price: 'CHF 1,200–2,000',
      time: '2–3 days',
      triggers: 'Nightly job',
      actions: 'merge duplicates, normalize phones, enrich via Clearbit/Dropcontact, flag missing fields',
      industryCopy: {
        clinics: {
          problem: 'Patient records are duplicated across forms, causing confusion during scheduling.',
          solution: 'Merge duplicate patient records, clean contact info, and flag missing insurance details every night.'
        },
        dentists: {
          problem: 'Prospective patient lists contain duplicates and outdated phone numbers.',
          solution: 'Clean up the CRM daily so your front desk calls the right number with the right name.'
        },
        construction: {
          problem: 'Multiple contacts for the same property clutter job pipelines.',
          solution: 'Consolidate property records, normalise phone/address formats, and spot missing permits or budgets.'
        },
        agencies: {
          problem: 'Leads appear multiple times with different UTM tags, confusing reporting.',
          solution: 'Merge duplicates, keep tracking fields consistent, and highlight missing company data.'
        },
        ecommerce: {
          problem: 'Customer profiles are duplicated across Shopify, Klaviyo, and the CRM.',
          solution: 'Sync and dedupe customer data nightly so segmentation and messaging stay accurate.'
        }
      }
    },
    {
      id: 9,
      title: 'KPI Auto-Reports',
      baseProblem: 'Reporting takes hours of spreadsheet work, so nobody sees the numbers on time.',
      baseSolution: 'Pull data automatically, generate clear reports, and send insights to your team on schedule.',
      price: 'CHF 800–1,500',
      time: '1–2 days',
      triggers: 'daily/weekly',
      actions: 'pull Stripe, Calendly, CRM, produce chart PDF + Slack/Email summary with insights from GPT',
      industryCopy: {
        clinics: {
          problem: 'You don\'t see weekly new patient counts or therapist utilisation until month-end.',
          solution: 'Send a weekly report with new bookings, cancellations, and utilisation automatically to the team.'
        },
        dentists: {
          problem: 'Production, collections, and chair time numbers are buried in practice software.',
          solution: 'Email a dashboard each morning summarising production, case acceptance, and outstanding balances.'
        },
        construction: {
          problem: 'Project managers manually gather job budgets vs. actuals for meetings.',
          solution: 'Compile job margins, change orders, and cash flow into a daily digest and Slack it to leadership.'
        },
        agencies: {
          problem: 'Campaign KPIs are in different ad platforms, so managers fly blind.',
          solution: 'Aggregate ad spend, leads, and ROI, then send a plain-language summary to each account team.'
        },
        ecommerce: {
          problem: 'Sales, returns, and CAC numbers live in separate tools.',
          solution: 'Pull Shopify, Stripe, and ad platform data into one daily snapshot with actionable notes.'
        }
      }
    },
    {
      id: 10,
      title: 'WhatsApp Lead Funnel',
      baseProblem: 'People click your WhatsApp link but the conversation stalls immediately.',
      baseSolution: 'Guide them through a scripted flow that collects details, delivers value, and books the next step.',
      price: 'CHF 1,100–1,900',
      time: '2–3 days',
      triggers: 'QR or ad click to WhatsApp',
      actions: 'menu, collect email, deliver PDF, add to CRM + newsletter, schedule call link',
      industryCopy: {
        clinics: {
          problem: 'Event QR codes spark interest but leads don\'t fill in intake forms.',
          solution: 'Walk the prospect through triage questions, send resources, and hand the lead to the front desk.'
        },
        dentists: {
          problem: 'Smile campaign clicks go nowhere because nobody guides the chat.',
          solution: 'Collect whitening or implant preferences, share before/after images, and book a consult automatically.'
        },
        construction: {
          problem: 'Showroom visitors scan a QR but no one captures their project details.',
          solution: 'Gather budget, timeline, and location, then schedule a site visit in one flow.'
        },
        agencies: {
          problem: 'Meta ads drive prospects into WhatsApp but the conversation dies.',
          solution: 'Qualify the lead with key questions, share creds, and slot them into the calendar instantly.'
        },
        ecommerce: {
          problem: 'Whatsapp giveaways grow subscribers but rarely convert to sales.',
          solution: 'Deliver the lead magnet, capture email + preferences, and send a promo code on autopilot.'
        }
      }
    },
    {
      id: 11,
      title: 'Support Ticket Assistant',
      baseProblem: 'Agents dig through old conversations before they can even draft a reply.',
      baseSolution: 'Show the full history instantly and suggest the next reply so the team can respond in minutes.',
      price: 'CHF 1,300–2,200',
      time: '3 days',
      triggers: 'new ticket',
      actions: 'retrieve past emails/docs, propose first reply, suggest next steps, escalate rules',
      industryCopy: {
        clinics: {
          problem: 'Care coordinators search through notes before answering patient questions.',
          solution: 'Pull the patient’s history, summarise it, and suggest the next best response to the coordinator.'
        },
        dentists: {
          problem: 'Front desk staff dig into charts before replying about treatment plans or lab cases.',
          solution: 'Show past appointments and treatment notes and propose a polished response immediately.'
        },
        construction: {
          problem: 'Project support teams search through emails to answer site questions.',
          solution: 'Gather job context, surface the latest drawings, and draft the reply for the project manager.'
        },
        agencies: {
          problem: 'Account managers review long email chains before responding to clients.',
          solution: 'Summarise the thread, highlight open tasks, and draft a client-ready update automatically.'
        },
        ecommerce: {
          problem: 'Support agents hunt for order history before answering each ticket.',
          solution: 'Display the order timeline, past tickets, and a suggested reply in seconds.'
        }
      }
    },
    {
      id: 12,
      title: 'HR Onboarding Automation',
      baseProblem: 'New hires wait for accounts, paperwork, and equipment because onboarding is manual.',
      baseSolution: 'Kick off every onboarding task automatically so the new teammate is ready on day one.',
      price: 'CHF 1,000–1,800',
      time: '2–3 days',
      triggers: 'signed offer',
      actions: 'create accounts, send onboarding pack, checklist in Notion, calendar events, payroll entry',
      industryCopy: {
        clinics: {
          problem: 'Therapists start without EMR logins or consent templates ready.',
          solution: 'Create accounts, send policy packs, and assign onboarding tasks automatically after offer acceptance.'
        },
        dentists: {
          problem: 'New hygienists arrive without system access or equipment basics.',
          solution: 'Generate logins, schedule training, and share SOPs the moment the offer is signed.'
        },
        construction: {
          problem: 'Field crews show up without safety credentials or project access.',
          solution: 'Issue access badges, safety checklists, and onboarding tasks automatically before day one.'
        },
        agencies: {
          problem: 'New account managers wait for tool access and client context.',
          solution: 'Provision tools, share client documentation, and schedule intro calls automatically.'
        },
        ecommerce: {
          problem: 'Warehouse hires start without system access or shift info.',
          solution: 'Create system accounts, send training videos, and assign first-week tasks automatically.'
        }
      }
    }
  ];

  packages: Package[] = [
    {
      name: 'Diagnostic Sprint',
      price: 'CHF 499',
      description: '90-min audit, map 3 automations, implement 1 quick win.'
    },
    {
      name: 'Core Build',
      price: 'CHF 1,300',
      description: 'One end-to-end automation + docs + handover.'
    },
    {
      name: 'Plus Build',
      price: 'CHF 2,500',
      description: 'Two automations + QA + staff training.'
    },
    {
      name: 'Care Plan',
      price: 'CHF 199–399/mo',
      description: 'Uptime checks, small changes, logs, model/key management.'
    }
  ];

  selectIndustry(industry: Industry): void {
    this.selectedIndustry = industry.value;
  }

  getServiceProblem(service: AIService): string {
    return (
      service.industryCopy?.[this.selectedIndustry]?.problem ??
      service.baseProblem
    );
  }

  getServiceSolution(service: AIService): string {
    return (
      service.industryCopy?.[this.selectedIndustry]?.solution ??
      service.baseSolution
    );
  }

  get selectedIndustryLabel(): string {
    return (
      this.industries.find((item) => item.value === this.selectedIndustry)
        ?.label ?? ''
    );
  }
}

