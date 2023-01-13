import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterComponent } from './recipe-filter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createObserver } from '../../testing/observer';

describe(RecipeFilterComponent.name, () => {
  const { observe } = createObserver();

  it('should trigger filterChange output', async () => {
    const { component, fixture, setInputValue } = createComponent();

    fixture.detectChanges();

    const observer = observe(component.filterChange);

    await setInputValue('[data-role=keywords-input]', 'Cauliflower');
    await setInputValue('[data-role=max-ingredient-count-input]', '3');
    await setInputValue('[data-role=max-step-count-input]', '10');

    expect(observer.next).lastCalledWith({
      keywords: 'Cauliflower',
      maxIngredientCount: 3,
      maxStepCount: 10,
    } as RecipeFilter);
  });

  function createComponent() {
    TestBed.configureTestingModule({ imports: [NoopAnimationsModule] });

    const fixture = TestBed.createComponent(RecipeFilterComponent);

    const loader = TestbedHarnessEnvironment.loader(fixture);

    return {
      component: fixture.componentInstance,
      fixture,
      async setInputValue(selector: string, value: string) {
        const harness = await loader.getHarness(
          MatInputHarness.with({ selector })
        );
        await harness.setValue(value);
      },
    };
  }
});
