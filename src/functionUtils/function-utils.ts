import { isObject, isArray, isFunction, isString } from '../guards';

/**
 * Checks if a value is not `null` or `undefined`.
 * @param value The value to check.
 * @returns true if the value is not `null` or `undefined`, false otherwise.
 *
 * @example
 * ```typescript
 * const value: number | null | undefined = 42;
 * if (isDefined(value)) {
 *     console.log(value * 2); // Outputs: 84
 * }
 * ```
 */
export function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

/**
 * Checks if a value is truthy.
 * @param value The value to check.
 * @returns true if the value is truthy, false otherwise.
 *
 * @example
 * ```typescript
 * const truthyValue = 'Hello';
 * if (isTruthy(truthyValue)) {
 *     console.log(truthyValue.toUpperCase()); // Outputs: HELLO
 * }
 * ```
 */
export function isTruthy<T>(value: T | null | undefined): value is T {
    return !!value;
}

/**
 * Checks if a value is falsy.
 * @param value The value to check.
 * @returns true if the value is falsy, false otherwise.
 *
 * @example
 * ```typescript
 * const falsyValue = 0;
 * if (isFalsy(falsyValue)) {
 *     console.log('Falsy value detected'); // Outputs: Falsy value detected
 * }
 * ```
 */
export function isFalsy<T>(value: T | null | undefined): value is T {
    return !value;
}

/**
 * Checks if a value is an empty object (has no own properties).
 * @param value The value to check.
 * @returns true if the value is an empty object, false otherwise.
 *
 * @example
 * ```typescript
 * const emptyObject = {};
 * if (isEmptyObject(emptyObject)) {
 *     console.log('Empty object detected'); // Outputs: Empty object detected
 * }
 * ```
 */
export function isEmptyObject(value: any): boolean {
    return isObject(value) && Object.keys(value).length === 0;
}

/**
 * Checks if a value is a plain object (not an array, function, or null).
 * @param value The value to check.
 * @returns true if the value is a plain object, false otherwise.
 *
 * @example
 * ```typescript
 * const plainObject = { key: 'value' };
 * if (isPlainObject(plainObject)) {
 *     console.log('Plain object detected'); // Outputs: Plain object detected
 * }
 * ```
 */
export function isPlainObject(value: any): boolean {
    return isObject(value) && !isArray(value) && !isFunction(value);
}

/**
 * Checks if a value is an instance of a specific class.
 * @param value The value to check.
 * @param constructor The constructor function of the class.
 * @returns true if the value is an instance of the class, false otherwise.
 *
 * @example
 * ```typescript
 * class MyClass {}
 * const instance = new MyClass();
 * if (isInstanceOf(instance, MyClass)) {
 *     console.log('Instance of MyClass detected'); // Outputs: Instance of MyClass detected
 * }
 * ```
 */
export function isInstanceOf(value: any, constructor: Function): boolean {
    return value instanceof constructor;
}

/**
 * Checks if a value is an empty string.
 * @param value The value to check.
 * @returns true if the value is an empty string, false otherwise.
 *
 * @example
 * ```typescript
 * const emptyString = '';
 * if (isEmptyString(emptyString)) {
 *     console.log('Empty string detected'); // Outputs: Empty string detected
 * }
 * ```
 */
export function isEmptyString(value: any): boolean {
    return isString(value) && value.length === 0;
}

/**
 * Checks if a value is a non-empty string.
 * @param value The value to check.
 * @returns true if the value is a non-empty string, false otherwise.
 *
 * @example
 * ```typescript
 * const nonEmptyString = 'Hello';
 * if (isNonEmptyString(nonEmptyString)) {
 *     console.log('Non-empty string detected'); // Outputs: Non-empty string detected
 * }
 * ```
 */
export function isNonEmptyString(value: any): boolean {
    return isString(value) && value.length > 0;
}

/**
 * Checks if a value is an empty array.
 * @param value The value to check.
 * @returns true if the value is an empty array, false otherwise.
 *
 * @example
 * ```typescript
 * const emptyArray: any[] = [];
 * if (isEmptyArray(emptyArray)) {
 *     console.log('Empty array detected'); // Outputs: Empty array detected
 * }
 * ```
 */
export function isEmptyArray(value: any): boolean {
    return isArray(value) && value.length === 0;
}

/**
 * Checks if a value is a non-empty array.
 * @param value The value to check.
 * @returns true if the value is a non-empty array, false otherwise.
 *
 * @example
 * ```typescript
 * const nonEmptyArray = [1, 2, 3];
 * if (isNonEmptyArray(nonEmptyArray)) {
 *     console.log('Non-empty array detected'); // Outputs: Non-empty array detected
 * }
 * ```
 */
export function isNonEmptyArray(value: any): boolean {
    return isArray(value) && value.length > 0;
}
