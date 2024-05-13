import { Observable, Subscription, Unsubscribable } from 'rxjs';
import { type Mock, type Mocked, type MockedFunction } from 'vitest';

export function createObserver() {
  let subscription: Subscription;

  beforeEach(() => (subscription = new Subscription()));
  afterEach(() => subscription.unsubscribe());

  return {
    observe<T>(observable: Subscribable<T>) {
      const next = createSpy<[T], void>();

      /* Making our observer compatible with Angular's OutputRef.. */
      const observer = next as Mock<[T], void> &
        Mocked<{
          next: typeof next;
          error: Mock<[unknown], void>;
          complete: Mock<[], void>;
        }>;
      Object.assign(observer, {
        next,
        error: createSpy<[unknown], void>(),
        complete: createSpy<[], void>(),
      });

      subscription.add(observable.subscribe(observer));

      return {
        ...observer,
        clear() {
          observer.next.mockClear();
          observer.error.mockClear();
          observer.complete.mockClear();
        },
        reset() {
          observer.next.mockReset();
          observer.error.mockReset();
          observer.complete.mockReset();
        },
      };
    },
  };
}

type Subscribable<T> =
  | Observable<T>
  | { subscribe(fn: (v: T) => void): Unsubscribable };

function createSpy<PARAMS extends unknown[], RETURN>(): MockedFunction<
  (...args: PARAMS) => RETURN
> {
  const global = globalThis as any;
  return global.vi ? global.vi.fn() : jest.fn();
}
