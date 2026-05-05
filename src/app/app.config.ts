import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  LUCIDE_ICONS, LucideIconProvider,
  User, Briefcase, Cpu, Folder, Mail, MessageCircle,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: LUCIDE_ICONS,
      useValue: new LucideIconProvider({ User, Briefcase, Cpu, Folder, Mail, MessageCircle }),
      multi: true,
    },
  ],
};
