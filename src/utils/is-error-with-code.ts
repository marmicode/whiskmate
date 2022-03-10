export interface ErrorWithCode extends Error {
  code: string;
}

/* @todo use unknown when https://github.com/microsoft/TypeScript/issues/25720 is fixed. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isErrorWithCode(err: any): err is ErrorWithCode {
  return typeof err?.code === 'string';
}
