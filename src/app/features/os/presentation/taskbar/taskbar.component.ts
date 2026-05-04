import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowManagerService } from '../../application/window-manager.service';

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css',
})
export class TaskbarComponent {
  private readonly wm = inject(WindowManagerService);

  protected readonly windows = this.wm.windows;
  protected readonly time = computed(() => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

  focus(id: string) { this.wm.focus(id); }
  toggleMinimize(id: string) { this.wm.toggleMinimize(id); }
}
