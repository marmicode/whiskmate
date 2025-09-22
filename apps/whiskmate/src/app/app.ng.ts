import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from './shared/title.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-app',
  imports: [Title],
  template: ` <wm-title>👨🏻‍🍳 Welcome to Whiskmate 🥘</wm-title> `,
})
export class App {}
