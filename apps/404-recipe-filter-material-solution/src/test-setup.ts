import '@testing-library/jest-dom/vitest';
import './test-setup-common';

/**
 * When using `forks` or `threads` pools, Vitest does not override the global `window`,
 * Therefore, when Angular CDK harness creates an event using `window` as the view,
 * the `window` reference is different from jsdom's, and this causes the following error:
 *   TypeError: Failed to construct 'KeyboardEvent': member view is not of type Window.
 *
 * The workaround is to override the `window` global variable.
 * This only fixes code that uses `window` but not code using `globalThis`.
 *
 * @see https://github.com/angular/components/blob/3c84525dd23cfb20691ae07e4e39caa36c354af4/src/cdk/testing/testbed/fake-events/event-objects.ts#L142
 * @see https://github.com/vitest-dev/vitest/issues/4685
 */
beforeEach(() => {
  if (g.jsdom && g.jsdom.window !== g.window) {
    vi.spyOn(g, 'window', 'get').mockImplementation(() => g.jsdom.window);
  }
});

const g = globalThis as unknown as typeof globalThis & {
  jsdom: { window: Window & typeof globalThis };
};
