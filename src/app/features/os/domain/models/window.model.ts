export type WindowId = string;

export interface IWindow {
  id: WindowId;
  title: string;
  appId: string;
  isMinimized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}
