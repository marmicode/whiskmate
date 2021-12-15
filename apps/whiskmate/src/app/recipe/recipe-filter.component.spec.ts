import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createObserver } from '../../testing/observer';
import { RecipeFilter } from './recipe-filter';
import {
  RecipeFilterComponent,
  RecipeFilterModule,
} from './recipe-filter.component';
import { RecipeFilterHarness } from './recipe-filter.harness';

describe(RecipeFilterComponent.name, () => {
  const { observe } = createObserver();

  it('should trigger filterChange output', async () => {
    const { component, harness } = await createComponent();

    const observer = observe(component.filterChange);

    await harness.setValue({
      keywords: 'Cauliflower',
      maxIngredientCount: 3,
      maxStepCount: 10,
    });

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
      harness: await TestbedHarnessEnvironment.harnessForFixture(
        fixture,
        RecipeFilterHarness
      ),
    };
  }
});
