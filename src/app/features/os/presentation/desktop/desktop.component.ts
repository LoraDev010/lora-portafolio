import { Component, inject } from '@angular/core';
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

const DESKTOP_APPS: IApp[] = [
  { id: 'about',    label: 'About Me',  icon: '◉' },
  { id: 'skills',   label: 'Skills',    icon: '⬡' },
  { id: 'projects', label: 'Projects',  icon: '⬟' },
  { id: 'contact',  label: 'Contact',   icon: '◈' },
  { id: 'ai',       label: 'AI Chat',   icon: '△' },
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
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css',
})
export class DesktopComponent {
  private readonly wm = inject(WindowManagerService);

  protected readonly windows = this.wm.windows;

  protected readonly items: IDesktopItem[] = DESKTOP_APPS.map(app => ({
    app,
    position: { x: 0, y: 0 },
  }));

  openApp(app: IApp) {
    this.wm.open(app.id, app.label);
  }
}
