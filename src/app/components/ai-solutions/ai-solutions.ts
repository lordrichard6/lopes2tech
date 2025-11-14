import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
} from '@angular/common';
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
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';
import { AiSolutionsHeroAnimationComponent } from './hero-animation/hero-animation.component';
import { Subscription } from 'rxjs';

interface IndustryCopy {
  problem: string;
  solution: string;
}

interface AIService {
  id: number;
  title: string;
  translationKey: string;
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
  translationKey: string;
  hasDialog: boolean;
}

interface Industry {
  label: string;
  labelKey: string;
  value: string;
}

@Component({
  selector: 'app-ai-solutions',
  standalone: true,
  imports: [
    CommonModule,
    MeetingSectionComponent,
    TranslatePipe,
    AiSolutionsHeroAnimationComponent,
  ],
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
export class AISolutionsComponent implements OnInit, OnDestroy {
  industries: Industry[] = [
    {
      label: 'Clinics & Therapists',
      labelKey: 'aiSolutions.industries.clinics',
      value: 'clinics'
    },
    {
      label: 'Dentists & Beauty',
      labelKey: 'aiSolutions.industries.dentists',
      value: 'dentists'
    },
    {
      label: 'Construction & Trades',
      labelKey: 'aiSolutions.industries.construction',
      value: 'construction'
    },
    {
      label: 'Agencies',
      labelKey: 'aiSolutions.industries.agencies',
      value: 'agencies'
    },
    {
      label: 'E-commerce',
      labelKey: 'aiSolutions.industries.ecommerce',
      value: 'ecommerce'
    },
    {
      label: 'Real Estate',
      labelKey: 'aiSolutions.industries.realestate',
      value: 'realestate'
    },
    {
      label: 'Hospitality',
      labelKey: 'aiSolutions.industries.hospitality',
      value: 'hospitality'
    },
    {
      label: 'Professional Services',
      labelKey: 'aiSolutions.industries.services',
      value: 'services'
    }
  ];

  selectedIndustry = this.industries[0].value;
  private languageSubscription: Subscription;
  private isBrowser: boolean;

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.languageSubscription = this.translationService
      .getCurrentLanguage()
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  services: AIService[] = [
    {
      id: 1,
      title: 'AI Customer Support Agent',
      translationKey: 'aiSolutions.services.customerSupportAgent',
      baseProblem:
        'Support teams drown in repetitive tickets, so customers wait hours for basic answers and abandon carts or calls.',
      baseSolution:
        'Launch an AI agent that handles FAQs across chat, email, and WhatsApp, escalates edge cases, and keeps every interaction logged.',
      price: 'Setup CHF 2k–6k + CHF 300–800/mo',
      time: '5–9 working days',
      industryCopy: {
        clinics: {
          problem:
            'Patients chase insurance coverage details and appointment logistics, but the front desk is already on the phone.',
          solution:
            'Let the agent answer intake, insurance, and prep questions instantly, then escalate only the sensitive cases to staff.'
        },
        dentists: {
          problem:
            'Smile consult questions pile up overnight, so prospects wait until business hours and often ghost.',
          solution:
            'Have the agent quote timelines, share financing info, and book chair time while alerting the team when a human is needed.'
        },
        construction: {
          problem:
            'Homeowners ping you about permits, site access, or payment status but no one monitors the shared inbox after hours.',
          solution:
            'Give them an automated coordinator that answers project FAQs, gathers missing info, and passes escalations to the PM.'
        },
        agencies: {
          problem:
            'Clients open tickets for reporting access, scope changes, and billing but your Slack and email threads become chaos.',
          solution:
            'Deploy an AI account concierge that triages tickets, surfaces playbooks, and loops the right strategist when needed.'
        },
        ecommerce: {
          problem:
            'Order status and return questions overwhelm support, delaying replies and spiking refund requests.',
          solution:
            'Have the agent look up orders, handle returns, and push tricky VIP cases to a human with full context.'
        },
        realestate: {
          problem:
            'Buyers and tenants ask about listings, visits, or document status and never get a quick reply.',
          solution:
            'Route them through an AI concierge that answers availability, schedules tours, and escalates hot leads to brokers.'
        },
        hospitality: {
          problem:
            'Guests bombard WhatsApp and email for upgrades, transport, or check-in info while the concierge desk is swamped.',
          solution:
            'Provide a digital concierge that handles routine requests 24/7 and only pings staff when on-site help is required.'
        },
        services: {
          problem:
            'Consultancies and pro-services firms juggle onboarding questions, contract requests, and project updates in one inbox.',
          solution:
            'Roll out an AI coordinator that shares SOPs, gathers missing docs, and forwards complex queries to the right consultant.'
        }
      }
    },
    {
      id: 2,
      title: 'AI Sales & Outreach (“AI SDR”)',
      translationKey: 'aiSolutions.services.salesOutreachAgent',
      baseProblem:
        'Cold outreach stalls because nobody has the bandwidth to research leads, personalise emails, and follow up consistently.',
      baseSolution:
        'Spin up an AI SDR that enriches leads, writes personalised sequences, sends on-brand multi-channel outreach, and books meetings automatically.',
      price: 'Setup CHF 1.5k–4.5k + CHF 400–1.2k/mo',
      time: '5–7 working days',
      industryCopy: {
        clinics: {
          problem:
            'Clinicians rely on referrals, so nobody follows up with inbound corporate wellness or B2B partnership leads.',
          solution:
            'Use an AI SDR to research HR contacts, personalise wellness pitches, and slot discovery calls automatically.'
        },
        dentists: {
          problem:
            'Smile makeover prospects request info but there’s no consistent nurture sequence, so they move on to other clinics.',
          solution:
            'Let the agent send educational drips, showcase cases, and chase deposits while syncing responses into your CRM.'
        },
        construction: {
          problem:
            'Estimators juggle job bids and never have time to warm new developers or architects with tailored outreach.',
          solution:
            'Have the agent monitor tenders, enrich the stakeholders, and send on-brand follow-ups that book site visits.'
        },
        agencies: {
          problem:
            'Pitch decks get downloaded but no one runs structured follow-ups across email and LinkedIn.',
          solution:
            'Enable the AI SDR to segment ICPs, craft sequences with case studies, and book qualified intro calls for the partners.'
        },
        ecommerce: {
          problem:
            'Wholesale partners and boutiques show interest but brand owners can’t keep up with personalised outreach.',
          solution:
            'Automate research, personalised pitches, and reorder reminders so wholesale channels grow without new headcount.'
        },
        realestate: {
          problem:
            'Developers and buyers request brochures, yet agents rely on manual follow-up and lose momentum.',
          solution:
            'Let the AI SDR nurture each lead with tailored comps, schedule site tours, and keep brokers updated.'
        },
        hospitality: {
          problem:
            'Corporate travel and event leads sit untouched because sales teams are busy with on-property tasks.',
          solution:
            'Have the agent research planners, send tailored proposals, and lock meeting slots for the events team.'
        },
        services: {
          problem:
            'Professional services firms depend on referrals and send generic outbound, so win rates are low.',
          solution:
            'Use AI-driven research and personalised sequences to highlight your niche expertise and generate qualified consults.'
        }
      }
    },
    {
      id: 3,
      title: 'AI Voice Agent (Phone Support / Booking)',
      translationKey: 'aiSolutions.services.voiceAgent',
      baseProblem:
        'Phone lines are overwhelmed and callers hang up before a human answers, so bookings and satisfaction drop.',
      baseSolution:
        'Deploy an AI voice agent that greets callers, qualifies them, routes or books appointments, and syncs every call with your CRM.',
      price: 'Setup CHF 2.5k–7k + CHF 300–1k/mo',
      time: '5–8 working days',
      industryCopy: {
        clinics: {
          problem:
            'Patients call to reschedule or ask pre-op questions, but hold times spike whenever the desk is busy.',
          solution:
            'Let the voice agent verify identity, share prep notes, and book slots while patching urgent clinical calls to staff.'
        },
        dentists: {
          problem:
            'Inbound smile enquiries ring out after hours, so valuable cases never reach the treatment coordinator.',
          solution:
            'Have the agent qualify procedures, collect photos, and reserve consult slots before escalating to the dentist.'
        },
        construction: {
          problem:
            'Crews and clients phone about site issues and delivery windows, yet office admins can’t keep up.',
          solution:
            'Use the voice agent to log tickets, give delivery ETAs, and escalate emergencies straight to the project manager.'
        },
        agencies: {
          problem:
            'Prospects phone for proposal updates or urgent campaign tweaks, but the team lives in meetings.',
          solution:
            'Deploy an AI hotline that routes VIP clients, records requests, and alerts the account lead instantly.'
        },
        ecommerce: {
          problem:
            'Small support teams can’t answer order or return calls quickly, so shoppers churn.',
          solution:
            'Enable the voice agent to look up orders, process exchanges, and hand tricky billing questions to humans.'
        },
        realestate: {
          problem:
            'Property inquiries arrive around the clock, but agents can’t answer every call.',
          solution:
            'Have the voice concierge pre-qualify buyers, schedule viewings, and send appointment confirmations automatically.'
        },
        hospitality: {
          problem:
            'Front desk phones are overloaded with upgrade, transfer, and amenity requests.',
          solution:
            'Provide a voice concierge that handles routine guest requests and routes VIP or emergency calls to staff.'
        },
        services: {
          problem:
            'Consulting or legal firms miss after-hours calls from prospects needing quick guidance.',
          solution:
            'Let the voice agent capture case context, route to the right partner, and book urgent consults.'
        }
      }
    },
    {
      id: 4,
      title: 'AI Knowledge-Base / Internal Helpdesk (RAG)',
      translationKey: 'aiSolutions.services.knowledgeBaseAgent',
      baseProblem:
        'Internal teams waste hours digging through docs, SOPs, and tickets to answer the same questions.',
      baseSolution:
        'Deliver an “ask your company” agent that indexes Notion, Drive, CRM, and ticket data with RAG so anyone gets audited answers instantly.',
      price: 'Setup CHF 3k–9k + CHF 400–1.2k/mo',
      time: '7–11 working days',
      industryCopy: {
        clinics: {
          problem:
            'Therapists and admin staff search through SOPs and patient policies manually, slowing care decisions.',
          solution:
            'Give teams a HIPAA-aware assistant that surfaces protocols, intake requirements, and escalation steps instantly.'
        },
        dentists: {
          problem:
            'New hygienists can’t find treatment guides or insurance policies, so the owner fields every question.',
          solution:
            'Centralise consent forms, lab workflows, and billing FAQs into a secure RAG bot accessible from any operatory.'
        },
        construction: {
          problem:
            'Site leads dig through SharePoint for safety manuals, permits, or change-order procedures.',
          solution:
            'Offer a “jobsite brain” that answers code, safety, and vendor questions from mobile without calling head office.'
        },
        agencies: {
          problem:
            'Strategists waste time finding playbooks, client decks, or historical results for onboarding teammates.',
          solution:
            'Let staff query campaign SOPs, brand guidelines, and past performance data via Slack and get sourced responses.'
        },
        ecommerce: {
          problem:
            'Ops and support teams search through Notion for shipping rules or promo T&Cs, causing inconsistent replies.',
          solution:
            'Provide a searchable knowledge brain that answers fulfillment, CX, and finance policies with linked sources.'
        },
        realestate: {
          problem:
            'Agents need quick access to compliance docs, landlord policies, and contract templates while in the field.',
          solution:
            'Enable a brokerage assistant that surfaces forms, checklists, and legal guidance on demand.'
        },
        hospitality: {
          problem:
            'Hotel teams juggle SOP binders for housekeeping, F&B, and guest recovery, so training takes weeks.',
          solution:
            'Give staff a multilingual, mobile-ready knowledge bot that answers SOP and brand-standard questions instantly.'
        },
        services: {
          problem:
            'Consultants rely on senior staff to find proposal templates or industry benchmarks.',
          solution:
            'Deploy a private RAG knowledge hub that surfaces reusable slides, pricing models, and case studies with citations.'
        }
      }
    },
    {
      id: 5,
      title: 'AI Workflow & Back-Office Automation',
      translationKey: 'aiSolutions.services.workflowAutomation',
      baseProblem:
        'Ops teams rely on manual copy-paste to move data between tools, so errors stack up and throughput stalls.',
      baseSolution:
        'Build automation packs that watch events, enrich data, update CRMs/ERPs, generate docs, and notify teams with zero manual effort.',
      price: 'Setup CHF 1.5k–5k + CHF 250–800/mo',
      time: '5–9 working days',
      industryCopy: {
        clinics: {
          problem:
            'Intake forms, lab results, and billing updates are copy-pasted between systems, causing errors in patient files.',
          solution:
            'Automate intake → EMR → billing so every submission triggers data enrichment, notifications, and audit-friendly logs.'
        },
        dentists: {
          problem:
            'Treatment plans, financing follow-ups, and lab orders all require manual status updates.',
          solution:
            'Build flows that sync treatment statuses, send payment reminders, and alert staff when labs ship.'
        },
        construction: {
          problem:
            'Purchase orders, site inspections, and job costing updates bounce between spreadsheets.',
          solution:
            'Connect n8n to your job management tools so new RFIs, invoices, and approvals update every system automatically.'
        },
        agencies: {
          problem:
            'Campaign briefs, creative approvals, and reporting steps rely on PMs nudging everyone manually.',
          solution:
            'Automate the workflow: when a brief is approved, create tasks, update Slack, and schedule reporting cadences.'
        },
        ecommerce: {
          problem:
            'Inventory, fulfillment, and finance platforms stay out of sync, so ops teams reconcile data by hand.',
          solution:
            'Have automations watch orders, sync ERPs/3PLs, raise exceptions, and push summaries to Slack each day.'
        },
        realestate: {
          problem:
            'Offer submissions, legal docs, and financing milestones live in separate tools, creating delays.',
          solution:
            'Automate deal stages so every signed doc updates the CRM, triggers compliance tasks, and notifies stakeholders.'
        },
        hospitality: {
          problem:
            'Group bookings, housekeeping schedules, and upsell offers require manual coordination between teams.',
          solution:
            'Coordinate PMS, POS, and messaging tools so new bookings trigger room prep, upsell campaigns, and finance updates.'
        },
        services: {
          problem:
            'Professional services firms re-enter data between proposal tools, CRMs, and billing.',
          solution:
            'Automate proposal acceptance → project creation → invoicing so nothing falls through the cracks.'
        }
      }
    },
  ];

  packages: Package[] = [
    {
      translationKey: 'carePlan',
      hasDialog: false
    },
    {
      translationKey: 'trio',
      hasDialog: false
    }
  ];

  isPackageDialogOpen = false;
  selectedPackage: Package | null = null;

  readonly carePlanOptions = [
    { translationKey: 'lite' },
    { translationKey: 'pro' },
    { translationKey: 'scale' },
  ];

  selectIndustry(industry: Industry): void {
    this.selectedIndustry = industry.value;
  }

  getServiceTitle(service: AIService): string {
    return this.getTranslatedValue(
      `${service.translationKey}.title`,
      service.title
    );
  }

  getIndustryLabel(industry: Industry): string {
    return this.getTranslatedValue(industry.labelKey, industry.label);
  }

  getServiceProblem(service: AIService): string {
    const industryKey = `${service.translationKey}.industry.${this.selectedIndustry}.problem`;
    const industryFallback =
      service.industryCopy?.[this.selectedIndustry]?.problem ?? '';
    const baseKey = `${service.translationKey}.problem`;

    const industryTranslated = this.getTranslatedValue(
      industryKey,
      industryFallback
    );

    if (industryFallback || industryTranslated !== industryFallback) {
      return industryTranslated;
    }

    return this.getTranslatedValue(baseKey, service.baseProblem);
  }

  getServiceSolution(service: AIService): string {
    const industryKey = `${service.translationKey}.industry.${this.selectedIndustry}.solution`;
    const industryFallback =
      service.industryCopy?.[this.selectedIndustry]?.solution ?? '';
    const baseKey = `${service.translationKey}.solution`;

    const industryTranslated = this.getTranslatedValue(
      industryKey,
      industryFallback
    );

    if (industryFallback || industryTranslated !== industryFallback) {
      return industryTranslated;
    }

    return this.getTranslatedValue(baseKey, service.baseSolution);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.document.defaultView?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }

  scrollToServices(): void {
    if (!this.isBrowser) {
      return;
    }

    const target = this.document.getElementById('ai-services');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openPackageDialog(pkg: Package): void {
    this.selectedPackage = pkg;
    this.isPackageDialogOpen = true;
  }

  closePackageDialog(): void {
    this.isPackageDialogOpen = false;
    this.selectedPackage = null;
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isPackageDialogOpen) {
      this.closePackageDialog();
    }
  }

  get selectedIndustryLabel(): string {
    const labelKey =
      this.industries.find((item) => item.value === this.selectedIndustry)
        ?.labelKey ?? '';

    const fallback =
      this.industries.find((item) => item.value === this.selectedIndustry)
        ?.label ?? '';

    return this.getTranslatedValue(labelKey, fallback);
  }

  private getTranslatedValue(key: string, fallback: string): string {
    if (!key) {
      return fallback;
    }

    const translated = this.translationService.instant(key);

    if (translated && translated !== key) {
      return translated;
    }

    return fallback;
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }
}

