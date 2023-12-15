export const isValidHex = (value: string): boolean => hexPattern.test(value);
export const hexPattern = /^(?:[a-f0-9]{3}|[a-f0-9]{6})$/i;
