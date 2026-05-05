import { Component, inject, signal, HostListener } from '@angular/core';
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
  { id: 'about', label: 'About Me', icon: 'user' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'skills', label: 'Skills', icon: 'cpu' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
  { id: 'ai', label: 'AI Chat', icon: 'message-circle' },
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

  protected readonly selecting = signal(false)
  protected readonly selectionBox = signal({ x: 0, y: 0, w: 0, h: 0 })
  private selStart = { x: 0, y: 0 };

  private buildItems(): IDesktopItem[] {
    const vw = window.innerWidth;
    const isMobile = vw < 768;
    const cols = 3;
    const colStep = 90;
    const iconW = 70;
    const gridW = (cols - 1) * colStep + iconW;
    const startX = isMobile ? Math.max(8, Math.round((vw - gridW) / 2)) : 24;
    return DESKTOP_APPS.map((app, i) => ({
      app,
      position: isMobile
        ? { x: startX + (i % cols) * colStep, y: 24 + Math.floor(i / cols) * 100 }
        : { x: startX, y: 24 + i * 100 },
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

  onDesktopMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('desktop')) return;
    this.selStart = { x: e.clientX, y: e.clientY };
    this.selecting.set(true);
    this.selectionBox.set({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
  }

  @HostListener('document:mousemove', ['$event'])
  onDesktopMouseMove(e: MouseEvent) {
    if (!this.selecting()) return;
    const x = Math.min(e.clientX, this.selStart.x);
    const y = Math.min(e.clientY, this.selStart.y);
    const w = Math.abs(e.clientX - this.selStart.x);
    const h = Math.abs(e.clientY - this.selStart.y);
    this.selectionBox.set({ x, y, w, h });
  }

  @HostListener('document:mouseup')
  onDesktopMouseUp() {
    this.selecting.set(false);
  }
}
