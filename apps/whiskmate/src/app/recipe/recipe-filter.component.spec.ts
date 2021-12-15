import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createObserver } from '../../testing/observer';
import { RecipeFilter } from './recipe-filter';
import {
  RecipeFilterComponent,
  RecipeFilterModule,
} from './recipe-filter.component';

describe(RecipeFilterComponent.name, () => {
  const { observe } = createObserver();

  it('should trigger filterChange output', async () => {
    const { component, fixture, setInputValue } = await createComponent();

    fixture.detectChanges();

    const observer = observe(component.filterChange);

    setInputValue('[data-role=keywords-input]', 'Cauliflower');
    setInputValue('[data-role=max-ingredient-count-input]', '3');
    setInputValue('[data-role=max-step-count-input]', '10');

    expect(observer.next).lastCalledWith({
      keywords: 'Cauliflower',
      maxIngredientCount: 3,
      maxStepCount: 10,
    } as RecipeFilter);
  });

  async function createComponent() {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RecipeFilterModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeFilterComponent);

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
