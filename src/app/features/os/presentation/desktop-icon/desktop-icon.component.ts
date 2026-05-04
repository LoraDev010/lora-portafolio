import { Component, input, output, HostListener, signal, OnInit } from '@angular/core';
import { IDesktopItem } from '../../domain/models/desktop-item.model';
import { IApp } from '../../domain/models/app.model';

@Component({
  selector: 'app-desktop-icon',
  standalone: true,
  imports: [],
  template: `
    <button class="icon" (mousedown)="onMouseDown($event)">
      <span class="icon__glyph">{{ item().app.icon }}</span>
      <span class="icon__label">{{ item().app.label }}</span>
    </button>
  `,
  styleUrl: './desktop-icon.component.css',
  host: {
    '[style.position]': '"absolute"',
    '[style.left.px]': 'pos().x',
    '[style.top.px]': 'pos().y',
  },
})
export class DesktopIconComponent implements OnInit {
  item = input.required<IDesktopItem>();
  opened = output<IApp>();
  moved = output<{ id: string; position: { x: number; y: number } }>();

  protected pos = signal({ x: 0, y: 0 });

  private dragging = false;
  private hasDragged = false;
  private startMouse = { x: 0, y: 0 };
  private dragOffset = { x: 0, y: 0 };

  ngOnInit() {
    this.pos.set(this.item().position);
  }

  onMouseDown(e: MouseEvent) {
    e.preventDefault();
    this.dragging = true;
    this.hasDragged = false;
    this.startMouse = { x: e.clientX, y: e.clientY };
    this.dragOffset = { x: e.clientX - this.pos().x, y: e.clientY - this.pos().y };
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.dragging) return;
    const dx = e.clientX - this.startMouse.x;
    const dy = e.clientY - this.startMouse.y;
    if (!this.hasDragged && Math.sqrt(dx * dx + dy * dy) < 5) return;
    this.hasDragged = true;
    this.pos.set({ x: e.clientX - this.dragOffset.x, y: e.clientY - this.dragOffset.y });
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (!this.dragging) return;
    this.dragging = false;
    if (!this.hasDragged) {
      this.opened.emit(this.item().app);
    } else {
      this.moved.emit({ id: this.item().app.id, position: this.pos() });
    }
  }
}
