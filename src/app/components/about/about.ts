import { Component, OnInit } from '@angular/core';
import { BusinessInfoService } from '../../services/business-info';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit {
  features: Array<{icon: string, title: string}> = [];

  constructor(private businessInfoService: BusinessInfoService) {}

  ngOnInit() {
    this.features = this.businessInfoService.getCompanyFeatures();
  }
}
