import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { NgIconsModule } from '@ng-icons/core';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
