import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { environment } from './environments/environment';
import { App } from './app/app.ng';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
