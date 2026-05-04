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

    const win: IWindow = {
      id,
      title,
      appId,
      isMinimized: false,
      isFocused: true,
      position: { x: 80 + Math.random() * 120, y: 60 + Math.random() * 80 },
      size: { width: 560, height: 400 },
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
