import '@angular/compiler';
import 'zone.js';
import '../src/styles.css';
import { beforeMount } from '@jscutlery/playwright-ct-angular/hooks';
import { provideAnimations } from '@angular/platform-browser/animations';

beforeMount(async ({ TestBed }) => {
  TestBed.configureTestingModule({
    providers: [provideAnimations()],
  });
});
