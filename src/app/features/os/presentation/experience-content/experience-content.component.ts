import { Component, inject } from '@angular/core';
import { PortfolioDataService } from '../../application/portfolio-data.service';

@Component({
  selector: 'app-experience-content',
  standalone: true,
  imports: [],
  templateUrl: './experience-content.component.html',
  styleUrl: './experience-content.component.css',
})
export class ExperienceContentComponent {
  private readonly data = inject(PortfolioDataService);
  protected readonly experience = this.data.experience;
}
