export function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.substring(0, maxLength - 3)}...`;
}
