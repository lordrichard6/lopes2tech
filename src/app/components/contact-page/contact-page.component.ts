import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailService } from '../../services/email.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { BusinessInfoService } from '../../services/business-info';
import { LoggerService } from '../../services/logger.service';

@Component({
    selector: 'app-contact-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent implements OnInit {
    meetingForm!: FormGroup;
    meetingSubmitting = false;
    meetingSubmitted = false;
    meetingStatus: 'success' | 'error' | null = null;
    meetingErrorMessage = '';
    context = 'Dedicated Contact Page';

    constructor(
        private fb: FormBuilder,
        private emailService: EmailService,
        private translation: TranslationService,
        private logger: LoggerService,
        public businessInfoService: BusinessInfoService
    ) { }

    ngOnInit(): void {
        this.meetingForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            company: [''],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            message: ['', [Validators.required, Validators.minLength(10)]],
            context: [this.context]
        });
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
                context: context || this.context
            });

            this.meetingStatus = sent ? 'success' : 'error';
            if (sent) {
                this.meetingForm.reset({ context: this.context });
            } else {
                this.meetingErrorMessage = this.translation.instant('meetingForm.status.error');
            }
        } catch (error) {
            this.logger.error('Error submitting form', error, 'ContactPageComponent');
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

        if (control.hasError('required')) return this.translation.instant('meetingForm.validation.required');
        if (control.hasError('email')) return this.translation.instant('meetingForm.validation.email');
        if (control.hasError('minlength')) {
            const min = control.errors?.['minlength'].requiredLength;
            return this.translation.instant('meetingForm.validation.minlength', { min });
        }
        return '';
    }
}
