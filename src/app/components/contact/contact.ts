import { Component, OnInit } from '@angular/core';
import { BusinessInfoService, BusinessInfo } from '../../services/business-info';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MeetingSectionComponent } from '../meeting-section/meeting-section';

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe, MeetingSectionComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit {
  businessInfo: BusinessInfo;

  constructor(
    private businessInfoService: BusinessInfoService,
  ) {
    this.businessInfo = this.businessInfoService.getBusinessInfo();
  }

  ngOnInit() {
    // Component initialization
  }

  getPhoneLink(): string {
    return `tel:+41${this.businessInfo.phone.replace(/\s+/g, '')}`;
  }

}
