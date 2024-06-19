/**
 * Checks if a value is a boolean.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a boolean, false otherwise.
 */
export function isBoolean(value: any): boolean {
    return typeof value === 'boolean';
}

/**
 * Checks if a value is a number.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a number, false otherwise.
 */
export function isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
}

/**
 * Checks if a value is a string.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a string, false otherwise.
 */
export function isString(value: any): boolean {
    return typeof value === 'string';
}

/**
 * Checks if a value is an object (excluding null).
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is an object (excluding null), false otherwise.
 */
export function isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
}

/**
 * Checks if a value is a function.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a function, false otherwise.
 */
export function isFunction(value: any): boolean {
    return typeof value === 'function';
}

/**
 * Checks if a value is null.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is null, false otherwise.
 */
export function isNull(value: any): boolean {
    return value === null;
}

/**
 * Checks if a value is undefined.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is undefined, false otherwise.
 */
export function isUndefined(value: any): boolean {
    return typeof value === 'undefined';
}

/**
 * Checks if a value is a symbol.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a symbol, false otherwise.
 */
export function isSymbol(value: any): boolean {
    return typeof value === 'symbol';
}

/**
 * Checks if a value is a BigInt.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a BigInt, false otherwise.
 */
export function isBigInt(value: any): boolean {
    return typeof value === 'bigint';
}
/**
 * Checks if a value is a Date object.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a Date object, false otherwise.
 */
export function isDate(value: any): boolean {
    return value instanceof Date;
}

/**
 * Checks if a value is an array.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is an array, false otherwise.
 */
export function isArray(value: any): boolean {
    return Array.isArray(value);
}

/**
 * Checks if a value is a regular expression.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a regular expression, false otherwise.
 */
export function isRegExp(value: any): boolean {
    return value instanceof RegExp;
}

/**
 * Checks if a value is an error object.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is an error object, false otherwise.
 */
export function isError(value: any): boolean {
    return value instanceof Error;
}
