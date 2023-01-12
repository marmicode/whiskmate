import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-app',
  template: `<h1>Welcome to Whismate</h1>`,
})
export class AppComponent {}
