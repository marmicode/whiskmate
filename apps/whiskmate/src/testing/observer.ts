import { Observable, Observer, Subscription } from 'rxjs';

export function createObserver() {
  let subscription: Subscription;

  beforeEach(() => (subscription = new Subscription()));
  afterEach(() => subscription.unsubscribe());

  return {
    observe<T>(observable: Observable<T>) {
      const observer: jest.Mocked<Observer<T>> = {
        next: jest.fn<void, [T]>(),
        error: jest.fn<void, [unknown]>(),
        complete: jest.fn<void, []>(),
      };
      subscription.add(observable.subscribe(observer));
      return {
        ...observer,
        mockReset() {
          observer.next.mockReset();
          observer.error.mockReset();
          observer.complete.mockReset();
        },
      };
    },
  };
}
