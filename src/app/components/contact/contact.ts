import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { BusinessInfoService, BusinessInfo } from '../../services/business-info';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../services/email.service';
import { LoggerService } from '../../services/logger.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact implements AfterViewInit, OnDestroy {
  readonly businessInfo: BusinessInfo;
  private readonly isBrowser: boolean;
  private intersectionObserver?: IntersectionObserver;
  private readonly triggeredElements = new WeakSet<Element>();

  @ViewChildren('revealItem', { read: ElementRef }) private revealItems!: QueryList<ElementRef<HTMLElement>>;

  // Form Properties
  meetingForm: FormGroup;
  meetingSubmitting = false;
  meetingSubmitted = false;
  meetingStatus: 'success' | 'error' | null = null;
  meetingErrorMessage = '';
  context = 'Contact Page';

  constructor(
    private businessInfoService: BusinessInfoService,
    @Inject(PLATFORM_ID) platformId: Object,
    private readonly renderer: Renderer2,
    private fb: FormBuilder,
    private emailService: EmailService,
    private logger: LoggerService,
    private translation: TranslationService
  ) {
    this.businessInfo = this.businessInfoService.getBusinessInfo();
    this.isBrowser = isPlatformBrowser(platformId);

    // Initialize Form
    this.meetingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      context: [this.context]
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            this.renderer.addClass(element, 'is-visible');
            this.triggeredElements.add(element);
            this.intersectionObserver?.unobserve(element);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    this.revealItems.forEach((item) => {
      const element = item.nativeElement;
      if (!this.triggeredElements.has(element)) {
        this.renderer.removeClass(element, 'is-visible');
        this.intersectionObserver?.observe(element);
      }
    });
  }

  // Form Logic
  async submitMeetingForm(): Promise<void> {
    if (this.meetingSubmitting) return;

    if (this.meetingForm.invalid) {
      this.meetingForm.markAllAsTouched();
      return;
    }

    this.meetingSubmitting = true;
    this.meetingSubmitted = false;
    this.meetingStatus = null;
    this.meetingErrorMessage = '';

    const { name, company, email, phone, message, context } = this.meetingForm.value;

    try {
      const sent = await this.emailService.sendContactEmail({
        name: name || '',
        company: company || '',
        email: email || '',
        phone: phone || '',
        message: message || '',
        context: context || this.context || 'Unknown context'
      });

      this.meetingStatus = sent ? 'success' : 'error';
      if (sent) {
        this.meetingForm.reset({ context: this.context });
      } else {
        this.meetingErrorMessage = this.translation.instant('meetingForm.status.error');
      }
    } catch (error) {
      this.logger.error('Error submitting meeting form', error, 'ContactComponent');
      this.meetingStatus = 'error';
      this.meetingErrorMessage = this.translation.instant('meetingForm.status.errorAlt');
    } finally {
      this.meetingSubmitting = false;
      this.meetingSubmitted = true;
    }
  }

  fieldInvalid(field: string): boolean {
    const control = this.meetingForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  fieldError(field: string): string {
    const control = this.meetingForm.get(field);
    if (!control) return '';

    if (control.hasError('required')) {
      return this.translation.instant('meetingForm.validation.required');
    }

    if (control.hasError('email')) {
      return this.translation.instant('meetingForm.validation.email');
    }

    if (control.hasError('minlength')) {
      const min = control.errors?.['minlength'].requiredLength;
      return this.translation.instant('meetingForm.validation.minlength', { min });
    }

    return '';
  }

  getPhoneLink(): string {
    return `tel:+41${this.businessInfo.phone.replace(/\s+/g, '')}`;
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    this.intersectionObserver?.disconnect();
  }
}
