import { Component, input, output } from '@angular/core';
import { IDesktopItem } from '../../domain/models/desktop-item.model';

@Component({
  selector: 'app-desktop-icon',
  standalone: true,
  template: `
    <button class="icon" (dblclick)="opened.emit(item().app)" (click)="selected.emit(item().app.id)">
      <span class="icon__glyph">{{ item().app.icon }}</span>
      <span class="icon__label">{{ item().app.label }}</span>
    </button>
  `,
  styleUrl: './desktop-icon.component.css',
})
export class DesktopIconComponent {
  item = input.required<IDesktopItem>();
  opened = output<{ id: string; label: string; icon: string }>();
  selected = output<string>();
}
