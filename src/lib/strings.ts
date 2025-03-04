/**
 * Converts the first character of the string to uppercase
 * @param str Enter a string
 * @returns A string with the first letter capitalized
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toCamelCase(str: string): string {
  return str.replace(/[-_](\w)/g, (_: string, c: string) => (c ? c.toUpperCase() : ""));
}

export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase());
}

export function toKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
}

export function toPascalCase(str: string): string {
  return str.replace(/[-_](\w)/g, (_: string, c: string) => (c ? c.toUpperCase() : ""));
}

export function toLowerCase(str: string): string {
  return str.toLowerCase();
}

export function toUpperCase(str: string): string {
  return str.toUpperCase();
}
