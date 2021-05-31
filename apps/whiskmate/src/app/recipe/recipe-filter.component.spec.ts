import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeFilter } from './recipe-filter';
import {
  RecipeFilterComponent,
  RecipeFilterModule,
} from './recipe-filter.component';
import { RecipeFilterHarness } from './recipe-filter.harness';

describe(RecipeFilterComponent.name, () => {
  it('should trigger filterChange output', async () => {
    const observer = jest.fn();

    const { component, harness } = await createComponent();

    component.filterChange.subscribe(observer);

    await harness.setFilter({
      keywords: 'Cauliflower',
      maxIngredientCount: 3,
      maxStepCount: 10,
    });

    expect(observer).lastCalledWith({
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
