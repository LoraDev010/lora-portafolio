import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../application/portfolio-data.service';

@Component({
  selector: 'app-projects-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-content.component.html',
  styleUrl: './projects-content.component.css',
})
export class ProjectsContentComponent {
  protected readonly projects = inject(PortfolioDataService).projects;
}
