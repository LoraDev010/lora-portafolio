import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowManagerService } from '../../application/window-manager.service';
import { IDesktopItem } from '../../domain/models/desktop-item.model';
import { IApp } from '../../domain/models/app.model';
import { DesktopIconComponent } from '../desktop-icon/desktop-icon.component';
import { WindowComponent } from '../window/window.component';
import { TaskbarComponent } from '../taskbar/taskbar.component';
import { AiAssistantComponent } from '../ai-assistant/ai-assistant.component';
import { AboutContentComponent } from '../about-content/about-content.component';
import { SkillsContentComponent } from '../skills-content/skills-content.component';
import { ProjectsContentComponent } from '../projects-content/projects-content.component';
import { ContactContentComponent } from '../contact-content/contact-content.component';
import { ExperienceContentComponent } from '../experience-content/experience-content.component';

const DESKTOP_APPS: IApp[] = [
  { id: 'about',      label: 'About Me',   icon: '◉' },
  { id: 'experience', label: 'Experience', icon: '◎' },
  { id: 'skills',     label: 'Skills',     icon: '⬡' },
  { id: 'projects',   label: 'Projects',   icon: '⬟' },
  { id: 'contact',    label: 'Contact',    icon: '◈' },
  { id: 'ai',         label: 'AI Chat',    icon: '△' },
];

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
    CommonModule,
    DesktopIconComponent,
    WindowComponent,
    TaskbarComponent,
    AiAssistantComponent,
    AboutContentComponent,
    SkillsContentComponent,
    ProjectsContentComponent,
    ContactContentComponent,
    ExperienceContentComponent,
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css',
})
export class DesktopComponent {
  private readonly wm = inject(WindowManagerService);

  protected readonly windows = this.wm.windows;

  protected readonly items = signal<IDesktopItem[]>(this.buildItems());

  private buildItems(): IDesktopItem[] {
    const isMobile = window.innerWidth < 768;
    return DESKTOP_APPS.map((app, i) => ({
      app,
      position: isMobile
        ? { x: 16 + (i % 3) * 90, y: 16 + Math.floor(i / 3) * 100 }
        : { x: 24, y: 24 + i * 100 },
    }));
  }

  openApp(app: IApp) {
    this.wm.open(app.id, app.label);
  }

  onIconMoved(id: string, position: { x: number; y: number }) {
    this.items.update(list =>
      list.map(item => (item.app.id === id ? { ...item, position } : item))
    );
  }
}
