import { Injectable, signal, computed } from '@angular/core';
import { IWindow, WindowId } from '../domain/models/window.model';

@Injectable({ providedIn: 'root' })
export class WindowManagerService {
  private readonly _windows = signal<IWindow[]>([]);
  private _zCounter = 100;

  readonly windows = this._windows.asReadonly();
  readonly openWindows = computed(() =>
    this._windows().filter(w => !w.isMinimized)
  );

  open(appId: string, title: string): void {
    const id: WindowId = `${appId}-${Date.now()}`;
    const existing = this._windows().find(w => w.appId === appId);
    if (existing) { this.focus(existing.id); return; }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 768;
    const w = isMobile ? vw - 16 : Math.min(560, vw - 32);
    const h = isMobile ? vh - 72 : Math.min(460, vh - 100);
    const x = isMobile ? 8 : Math.max(8, 80 + Math.random() * Math.max(0, vw - w - 120));
    const y = isMobile ? 8 : Math.max(8, 60 + Math.random() * Math.max(0, vh - h - 100));

    const win: IWindow = {
      id,
      title,
      appId,
      isMinimized: false,
      isFocused: true,
      position: { x, y },
      size: { width: w, height: h },
      zIndex: ++this._zCounter,
    };
    this._windows.update(ws => [...ws.map(w => ({ ...w, isFocused: false })), win]);
  }

  close(id: WindowId): void {
    this._windows.update(ws => ws.filter(w => w.id !== id));
  }

  focus(id: WindowId): void {
    this._windows.update(ws =>
      ws.map(w => ({
        ...w,
        isFocused: w.id === id,
        zIndex: w.id === id ? ++this._zCounter : w.zIndex,
        isMinimized: w.id === id ? false : w.isMinimized,
      }))
    );
  }

  toggleMinimize(id: WindowId): void {
    this._windows.update(ws =>
      ws.map(w => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  }

  move(id: WindowId, position: { x: number; y: number }): void {
    this._windows.update(ws =>
      ws.map(w => (w.id === id ? { ...w, position } : w))
    );
  }
}
