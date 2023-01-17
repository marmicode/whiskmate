import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RecipeFilterComponent } from './recipe-filter.component';

describe(RecipeFilterComponent.name, () => {
  it.todo('🚧 should trigger filterChange output');

  function renderComponent() {
    const fixture = TestBed.createComponent(RecipeFilterComponent);

    fixture.detectChanges();

    return {
      component: fixture.componentInstance,
      fixture,
      setInputValue(selector: string, value: string) {
        const el = fixture.debugElement.query(By.css(selector));
        el.nativeElement.value = value;
        el.nativeElement.dispatchEvent(new Event('input'));
      },
    };
  }
});
