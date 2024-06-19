type AnyObject = { [key: string]: any };

/**
 * Converts a string to camel case (lowercase first letter, uppercase following letters).
 * @param {string} str - The input string to convert.
 * @returns {string} The camel cased string.
 *
 * @example
 * // Returns "helloWorld"
 * toCamelCase("hello world");
 */
export function toCamelCase(str: string): string {
    return str.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

/**
 * Converts a string to snake case (lowercase with underscores between words).
 * @param {string} str - The input string to convert.
 * @returns {string} The snake cased string.
 *
 * @example
 * // Returns "hello_world"
 * toSnakeCase("helloWorld");
 */
export function toSnakeCase(str: string): string {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * Converts a string to kebab case (lowercase with hyphens between words).
 * @param {string} str - The input string to convert.
 * @returns {string} The kebab cased string.
 *
 * @example
 * // Returns "hello-world"
 * toKebabCase("helloWorld");
 */
export function toKebabCase(str: string): string {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * Converts a string to title case (capitalize the first letter of each word).
 * @param {string} str - The input string to convert.
 * @returns {string} The title cased string.
 *
 * @example
 * // Returns "Hello World"
 * toTitleCase("hello world");
 */
export function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * Converts a string to constant case (all uppercase with underscores between words).
 * @param {string} str - The input string to convert.
 * @returns {string} The constant cased string.
 *
 * @example
 * // Returns "HELLO_WORLD"
 * toConstantCase("hello world");
 */
export function toConstantCase(str: string): string {
    return str.toUpperCase().replace(/\s+/g, '_');
}

/**
 * Converts a string to swap case (swap the case of each character).
 * @param {string} str - The input string to convert.
 * @returns {string} The swap cased string.
 *
 * @example
 * // Returns "hELLO wORLD"
 * toSwapCase("Hello World");
 */
export function toSwapCase(str: string): string {
    return str.replace(/[a-z]/gi, (match) => (match.toLowerCase() === match ? match.toUpperCase() : match.toLowerCase()));
}

/**
 * Converts a string to sentence case (capitalize the first letter of the first word).
 * @param {string} str - The input string to convert.
 * @returns {string} The sentence cased string.
 *
 * @example
 * // Returns "Hello world"
 * toSentenceCase("hello world");
 */
export function toSentenceCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to upper case.
 * @param {string} str - The input string to convert.
 * @returns {string} The upper cased string.
 *
 * @example
 * // Returns "HELLO WORLD"
 * toUpperCase("hello world");
 */
export function toUpperCase(str: string): string {
    return str.toUpperCase();
}

/**
 * Converts a string to lower case.
 * @param {string} str - The input string to convert.
 * @returns {string} The lower cased string.
 *
 * @example
 * // Returns "hello world"
 * toLowerCase("HELLO WORLD");
 */
export function toLowerCase(str: string): string {
    return str.toLowerCase();
}
/**
 * Converts a string to pascal case (capitalize the first letter of each word and remove spaces).
 * @param {string} str - The input string to convert.
 * @returns {string} The pascal cased string.
 *
 * @example
 * // Returns "HelloWorld"
 * toPascalCase("hello world");
 */
export function toPascalCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()).replace(/\s+/g, '');
}

/**
 * Converts a string to camel case with the first letter lowercase (like camelCase but starting with a lowercase letter).
 * @param {string} str - The input string to convert.
 * @returns {string} The camel cased string with the first letter lowercase.
 *
 * @example
 * // Returns "helloWorld"
 * toCamelCaseLower(str: string): string {
 *   return str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toLowerCase());
 * }
 */
export function toCamelCaseLower(str: string): string {
    return str.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[A-Z]/, (chr) => chr.toLowerCase());
}

/**
 * Converts a string to start case (capitalize the first letter of each word and keep spaces).
 * @param {string} str - The input string to convert.
 * @returns {string} The start cased string.
 *
 * @example
 * // Returns "Hello World"
 * toStartCase("hello world");
 */
export function toStartCase(str: string): string {
    return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

/**
 * Converts a string to dot case (all lowercase with dots between words).
 * @param {string} str - The input string to convert.
 * @returns {string} The dot cased string.
 *
 * @example
 * // Returns "hello.world"
 * toDotCase("hello world");
 */
export function toDotCase(str: string): string {
    return str.replace(/\s+/g, '.').toLowerCase();
}

/**
 * Converts a string to path case (all lowercase with slashes between words).
 * @param {string} str - The input string to convert.
 * @returns {string} The path cased string.
 *
 * @example
 * // Returns "hello/world"
 * toPathCase("hello world");
 */
export function toPathCase(str: string): string {
    return str.replace(/\s+/g, '/').toLowerCase();
}
