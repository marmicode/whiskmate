export interface ErrorWithCode extends Error {
  code: string;
}

export function isErrorWithCode(err: unknown): err is ErrorWithCode {
  return err != null && typeof (err as ErrorWithCode).code === 'string';
}
