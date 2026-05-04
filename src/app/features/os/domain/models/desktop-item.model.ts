import { IApp } from './app.model';

export interface IDesktopItem {
  app: IApp;
  position: { x: number; y: number };
}
