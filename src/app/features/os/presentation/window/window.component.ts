import {
  Component, input, output, inject, ElementRef,
  HostListener, signal, OnInit
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { IWindow } from '../../domain/models/window.model';
import { WindowManagerService } from '../../application/window-manager.service';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './window.component.html',
  styleUrl: './window.component.css',
})
export class WindowComponent implements OnInit {
  win = input.required<IWindow>();
  closeRequested = output<string>();

  private readonly wm = inject(WindowManagerService);
  private readonly el = inject(ElementRef);

  private dragging = false;
  private dragOffset = { x: 0, y: 0 };

  protected pos = signal({ x: 0, y: 0 });

  ngOnInit() {
    this.pos.set(this.win().position);
  }

  get style() {
    const p = this.pos();
    return {
      left: `${p.x}px`,
      top: `${p.y}px`,
      width: `${this.win().size.width}px`,
      height: `${this.win().size.height}px`,
      'z-index': this.win().zIndex,
    };
  }

  onFocus() { this.wm.focus(this.win().id); }
  onClose() { this.wm.close(this.win().id); }
  onMinimize() { this.wm.toggleMinimize(this.win().id); }

  private startDrag(clientX: number, clientY: number) {
    this.dragging = true;
    this.dragOffset = { x: clientX - this.pos().x, y: clientY - this.pos().y };
    this.wm.focus(this.win().id);
  }

  private moveDrag(clientX: number, clientY: number) {
    if (!this.dragging) return;
    this.pos.set({ x: clientX - this.dragOffset.x, y: clientY - this.dragOffset.y });
  }

  private endDrag() {
    if (this.dragging) {
      this.dragging = false;
      this.wm.move(this.win().id, this.pos());
    }
  }

  onDragStart(e: MouseEvent) {
    this.startDrag(e.clientX, e.clientY);
  }

  onTouchDragStart(e: TouchEvent) {
    const t = e.touches[0];
    this.startDrag(t.clientX, t.clientY);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) { this.moveDrag(e.clientX, e.clientY); }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(e: TouchEvent) {
    if (!this.dragging) return;
    const t = e.touches[0];
    this.moveDrag(t.clientX, t.clientY);
  }

  @HostListener('document:mouseup')
  onMouseUp() { this.endDrag(); }

  @HostListener('document:touchend')
  onTouchEnd() { this.endDrag(); }
}
