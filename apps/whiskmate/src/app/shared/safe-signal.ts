import { signal } from '@angular/core';

/**
 * Creates a signal that throws an error when read before being set.
 * Useful for inputs.
 */
export function safeSignal<T>(): SafeSignal<T> {
  const sig = signal<T | undefined>(undefined);
  const newSig = () => {
    const value = sig();
    if (value === undefined) {
      throw new Error('Cannot read from input signal');
    }
    return value;
  };
  newSig.set = sig.set.bind(sig);
  return newSig as SafeSignal<T>;
}

type SafeSignal<T> = (() => T) & { set(value: T): void };
