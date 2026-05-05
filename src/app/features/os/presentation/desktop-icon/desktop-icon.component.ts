import { Component, input, output, HostListener, signal, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { IDesktopItem } from '../../domain/models/desktop-item.model';
import { IApp } from '../../domain/models/app.model';

@Component({
  selector: 'app-desktop-icon',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <button
      class="icon"
      (mousedown)="onPointerDown($event)"
      (touchstart)="onTouchDown($event)"
    >
      <lucide-angular
        class="icon__glyph"
        [name]="item().app.icon"
        [size]="34"
        [strokeWidth]="1.5"
      ></lucide-angular>
      <span class="icon__label">{{ item().app.label }}</span>
    </button>
  `,
  styleUrl: './desktop-icon.component.css',
  host: {
    '[style.position]': '"absolute"',
    '[style.left.px]': 'pos().x',
    '[style.top.px]': 'pos().y',
    '[style.touch-action]': '"none"',
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

  private startDrag(clientX: number, clientY: number) {
    this.dragging = true;
    this.hasDragged = false;
    this.startMouse = { x: clientX, y: clientY };
    this.dragOffset = { x: clientX - this.pos().x, y: clientY - this.pos().y };
  }

  private applyMove(clientX: number, clientY: number) {
    if (!this.dragging) return;
    const dx = clientX - this.startMouse.x;
    const dy = clientY - this.startMouse.y;
    if (!this.hasDragged && Math.sqrt(dx * dx + dy * dy) < 6) return;
    this.hasDragged = true;
    this.pos.set({ x: clientX - this.dragOffset.x, y: clientY - this.dragOffset.y });
  }

  private endDrag() {
    if (!this.dragging) return;
    this.dragging = false;
    if (!this.hasDragged) {
      this.opened.emit(this.item().app);
    } else {
      this.moved.emit({ id: this.item().app.id, position: this.pos() });
    }
  }

  onPointerDown(e: MouseEvent) {
    e.preventDefault();
    this.startDrag(e.clientX, e.clientY);
  }

  onTouchDown(e: TouchEvent) {
    const t = e.touches[0];
    this.startDrag(t.clientX, t.clientY);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) { this.applyMove(e.clientX, e.clientY); }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(e: TouchEvent) {
    if (!this.dragging) return;
    this.applyMove(e.touches[0].clientX, e.touches[0].clientY);
  }

  @HostListener('document:mouseup')
  onMouseUp() { this.endDrag(); }

  @HostListener('document:touchend')
  onTouchEnd() { this.endDrag(); }
}
