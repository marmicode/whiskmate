/**
 * Schedules a beforeEach & afterEach to initialize and destroy
 * a context named "bowl".
 *
 * @param setUp a function that will run before each test to create the bowl context
 * @returns a testing bowl
 */
export function createTestingBowl<
  T extends
    | Record<string, unknown>
    | {
        destroy?: () => void | Promise<void> | Partial<T> | Promise<Partial<T>>;
      }
>(setUp: () => T | Promise<T>): T {
  /* We force the type to T as we are quite sure that beforeEach
   * will run before any usage.
   * This will avoid optional chaining and type hinting. */
  const bowl = {} as T;

  beforeEach(async () => {
    Object.assign(bowl, await setUp());
  });

  afterEach(async () => {
    if ('destroy' in bowl && typeof bowl.destroy === 'function') {
      Object.assign(bowl, await bowl.destroy());
    }
  });

  return bowl;
}
