import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from './shared/title.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'wm-app',
    imports: [TitleComponent],
    template: ` <wm-title>👨🏻‍🍳 Welcome to Whiskmate 🥘</wm-title> `
})
export class AppComponent {}
