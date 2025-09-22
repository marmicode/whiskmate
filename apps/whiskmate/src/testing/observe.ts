import { Observable, Unsubscribable } from 'rxjs';

export function observe<T>(observable: Subscribable<T>) {
  const next = createSpy<[T], void>();
  let isComplete = false;
  let isErrorRead = false;
  let err: unknown = undefined;

  const subscriber = {
    next,
    error(_err: unknown) {
      err = _err;
    },
    complete() {
      isComplete = true;
    },
  };

  /* Making our observer compatible with Angular's `OutputEmitterRef`,
   * which is tricky because `subscribe` has the same name but different signature. */
  const isObservable = 'pipe' in observable;
  const subscription = isObservable
    ? observable.subscribe(subscriber)
    : observable.subscribe(next);

  return {
    next,
    clear() {
      next.mockClear();
      err = undefined;
      isComplete = false;
    },
    get error() {
      isErrorRead = true;
      return err;
    },
    get isComplete() {
      return isComplete;
    },
    [Symbol.dispose]() {
      subscription.unsubscribe();
      if (!isErrorRead && err) {
        throw err;
      }
    },
  };
}

type Subscribable<T> =
  | Observable<T>
  | { subscribe(fn: (v: T) => void): Unsubscribable };

/* Using jest.Mock as a return type instead of MockedFunction
 * because vitest implements [Symbol.dispose] but not jest.
 * We downgrade to Jest API. */
function createSpy<PARAMS extends unknown[], RETURN>(): jest.Mock<
  (...args: PARAMS) => RETURN
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const global = globalThis as any;
  return typeof jest !== 'undefined' ? jest.fn() : global.vi.fn();
}
