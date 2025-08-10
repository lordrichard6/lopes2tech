import { Component, OnInit } from '@angular/core';
import { BusinessInfoService, Service } from '../../services/business-info';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements OnInit {
  services: Service[] = [];

  constructor(private businessInfoService: BusinessInfoService) {}

  ngOnInit() {
    this.services = this.businessInfoService.getServices();
  }
}
