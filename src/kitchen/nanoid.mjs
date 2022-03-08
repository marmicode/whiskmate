const url = '_~getRandomVcryp0123456789bfhijklqsuvwxzABCDEFGHIJKLMNOPQSTUWXYZ';

export function nanoid() {
  let id = '';
  let size = 21;
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  while (0 < size--) {
    id += url[bytes[size] & 63];
  }
  return id;
}
