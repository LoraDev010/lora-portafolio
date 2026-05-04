import { Component } from '@angular/core';
import { DesktopComponent } from './features/os/presentation/desktop/desktop.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DesktopComponent],
  template: `<app-desktop />`,
})
export class App {}
