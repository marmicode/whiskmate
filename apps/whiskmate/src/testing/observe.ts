import { Observable, PartialObserver } from 'rxjs';

export function observe<T>(observable: Observable<T>) {
  const observer: PartialObserver<T> = {
    next: jest.fn<void, [T]>(),
    error: jest.fn<void, [unknown]>(),
    complete: jest.fn<void, []>(),
  };
  const subscription = observable.subscribe(observer);
  afterEach(() => subscription.unsubscribe());
  return observer;
}
