import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../application/portfolio-data.service';
import { ISkill, SkillCategory } from '../../domain/models/skill.model';

const CATEGORY_ICONS: Record<SkillCategory, string> = {
  'Frontend':       '⬡',
  'Backend':        '⬟',
  'Databases':      '◈',
  'DevOps & Cloud': '◉',
  'Architecture':   '△',
};

@Component({
  selector: 'app-skills-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-content.component.html',
  styleUrl: './skills-content.component.css',
})
export class SkillsContentComponent {
  private readonly data = inject(PortfolioDataService);

  protected readonly categories = [...this.data.skillsByCategory.entries()];

  protected readonly categoryIcons = CATEGORY_ICONS;

  levelLabel(level: number): string {
    if (level >= 90) return 'EXPERT';
    if (level >= 78) return 'ADVANCED';
    if (level >= 65) return 'MID';
    return 'JUNIOR';
  }

  levelClass(level: number): string {
    if (level >= 90) return 'expert';
    if (level >= 78) return 'advanced';
    if (level >= 65) return 'mid';
    return 'junior';
  }

  trackSkill(_: number, skill: ISkill) { return skill.name; }
}
