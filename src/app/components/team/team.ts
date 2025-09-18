import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './team.html',
  styleUrls: ['./team.scss']
})
export class TeamComponent {
  
}