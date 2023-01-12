import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent).catch((err) => console.error(err));
