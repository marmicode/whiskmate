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
    const { component, setInputValue } = renderComponent();

    const observer = observe(component.filterChange);

    await setInputValue('keywords-input', 'Cauliflower');
    await setInputValue('max-ingredient-count-input', '3');
    await setInputValue('max-step-count-input', '10');

    expect(observer.next).lastCalledWith({
      keywords: 'Cauliflower',
      maxIngredientCount: 3,
      maxStepCount: 10,
    } as RecipeFilter);
  });

  function renderComponent() {
    TestBed.configureTestingModule({ imports: [NoopAnimationsModule] });
    const fixture = TestBed.createComponent(RecipeFilterComponent);

    const loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();

    return {
      component: fixture.componentInstance,
      async setInputValue(
        dataRole:
          | 'keywords-input'
          | 'max-ingredient-count-input'
          | 'max-step-count-input',
        value: string
      ) {
        const harness = await loader.getHarness(
          MatInputHarness.with({ selector: `[data-role="${dataRole}"]` })
        );
        await harness.setValue(value);
      },
    };
  }
});
