import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  template: `🚧 &lt;wm-recipe-search&gt;`,
})
export class RecipeSearchComponent implements OnInit {
  ngOnInit() {
    throw new Error('🚧 Work in progress!');
  }
}
