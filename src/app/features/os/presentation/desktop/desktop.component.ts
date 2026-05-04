import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowManagerService } from '../../application/window-manager.service';
import { IDesktopItem } from '../../domain/models/desktop-item.model';
import { IApp } from '../../domain/models/app.model';
import { DesktopIconComponent } from '../desktop-icon/desktop-icon.component';
import { WindowComponent } from '../window/window.component';
import { TaskbarComponent } from '../taskbar/taskbar.component';
import { AiAssistantComponent } from '../ai-assistant/ai-assistant.component';

const DESKTOP_APPS: IApp[] = [
  { id: 'projects', label: 'Projects', icon: '⬡' },
  { id: 'about',    label: 'About Me', icon: '◉' },
  { id: 'contact',  label: 'Contact',  icon: '◈' },
  { id: 'ai',       label: 'AI Chat',  icon: '⬟' },
];

const WINDOW_CONTENT: Record<string, string> = {
  projects: 'Projects will appear here. Coming soon.',
  about:    'Hi, I\'m Lora — a frontend developer building elegant, scalable interfaces.',
  contact:  'andres.lora@invamer.com.co',
};

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [CommonModule, DesktopIconComponent, WindowComponent, TaskbarComponent, AiAssistantComponent],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css',
})
export class DesktopComponent {
  private readonly wm = inject(WindowManagerService);

  protected readonly windows = this.wm.windows;

  protected readonly items: IDesktopItem[] = DESKTOP_APPS.map((app, i) => ({
    app,
    position: { x: 0, y: 0 },
  }));

  protected readonly contentMap = WINDOW_CONTENT;

  openApp(app: IApp) {
    this.wm.open(app.id, app.label);
  }

  isAi(appId: string) { return appId === 'ai'; }
}
