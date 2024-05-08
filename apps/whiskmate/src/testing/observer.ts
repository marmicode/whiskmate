import { Observable, Observer, Subscription } from 'rxjs';

export function createObserver() {
  let subscription: Subscription;

  beforeEach(() => (subscription = new Subscription()));
  afterEach(() => subscription.unsubscribe());

  return {
    observe<T>(observable: Subscribable<T>) {
      const next = jest.fn<void, [T]>();

      /* Making our observer compatible with Angular's OutputRef.. */
      const observer = next as jest.Mocked<Observer<T>> & jest.Mock<void, [T]>;
      Object.assign(observer, {
        next,
        error: jest.fn<void, [unknown]>(),
        complete: jest.fn<void, []>(),
      });

      subscription.add(observable.subscribe(observer));

      return {
        ...observer,
        mockClear() {
          observer.next.mockClear();
          observer.error.mockClear();
          observer.complete.mockClear();
        },
        mockReset() {
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
  | { subscribe(fn: (v: T) => void): Subscription };
