import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-meeting-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './meeting-section.html',
  styleUrl: './meeting-section.scss'
})
export class MeetingSectionComponent implements OnChanges {
  @Input() context = '';
  @Input() title = 'Lets book a meeting ASAP';
  @Input() description = 'Tell me a bit about your company and what you need automated. I’ll respond the same day with a calendar link and next steps.';
  @Input() successTitle = 'Thanks for reaching out!';
  @Input() successDescription = 'I received your message and will reply shortly with a calendar link so we can speak ASAP.';

  meetingForm: FormGroup;
  meetingSubmitting = false;
  meetingSubmitted = false;
  meetingStatus: 'success' | 'error' | null = null;
  meetingErrorMessage = '';

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private logger: LoggerService
  ) {
    this.meetingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      context: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['context']) {
      this.meetingForm.patchValue({ context: this.context ?? '' });
    }
  }

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
        this.meetingForm.reset({ context: this.context ?? '' });
      } else {
        this.meetingErrorMessage =
          'We could not send your message automatically. Please try again or email us directly.';
      }
    } catch (error) {
      this.logger.error('Error submitting meeting form', error, 'MeetingSectionComponent');
      this.meetingStatus = 'error';
      this.meetingErrorMessage =
        'Something went wrong sending your message. Please try again in a moment.';
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
      return 'This field is required.';
    }

    if (control.hasError('email')) {
      return 'Please enter a valid email.';
    }

    if (control.hasError('minlength')) {
      const min = control.errors?.['minlength'].requiredLength;
      return `Please enter at least ${min} characters.`;
    }

    return '';
  }
}
