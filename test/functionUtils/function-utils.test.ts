import {
    isDefined,
    isTruthy,
    isFalsy,
    isEmptyObject,
    isPlainObject,
    isInstanceOf,
    isEmptyString,
    isNonEmptyString,
    isEmptyArray,
    isNonEmptyArray,
} from '../../src/functionUtils';

describe('Function Utils', () => {
    describe('isDefined', () => {
        test('should return true for defined values', () => {
            expect(isDefined(42)).toBe(true);
            expect(isDefined('Hello')).toBe(true);
        });

        test('should return false for null or undefined', () => {
            expect(isDefined(null)).toBe(false);
            expect(isDefined(undefined)).toBe(false);
        });
    });

    describe('isTruthy', () => {
        test('should return true for truthy values', () => {
            expect(isTruthy(42)).toBe(true);
            expect(isTruthy('Hello')).toBe(true);
            expect(isTruthy(true)).toBe(true);
        });

        test('should return false for falsy values', () => {
            expect(isTruthy(false)).toBe(false);
            expect(isTruthy(0)).toBe(false);
            expect(isTruthy(null)).toBe(false);
            expect(isTruthy(undefined)).toBe(false);
        });
    });

    describe('isFalsy', () => {
        test('should return true for falsy values', () => {
            expect(isFalsy(false)).toBe(true);
            expect(isFalsy(0)).toBe(true);
            expect(isFalsy(null)).toBe(true);
            expect(isFalsy(undefined)).toBe(true);
        });

        test('should return false for truthy values', () => {
            expect(isFalsy(42)).toBe(false);
            expect(isFalsy('Hello')).toBe(false);
            expect(isFalsy(true)).toBe(false);
        });
    });

    describe('isEmptyObject', () => {
        test('should return true for an empty object', () => {
            expect(isEmptyObject({})).toBe(true);
        });

        test('should return false for non-empty objects', () => {
            expect(isEmptyObject({ key: 'value' })).toBe(false);
        });
    });

    describe('isPlainObject', () => {
        test('should return true for plain objects', () => {
            expect(isPlainObject({ key: 'value' })).toBe(true);
        });

        test('should return false for arrays, functions, or null', () => {
            expect(isPlainObject([])).toBe(false);
            expect(isPlainObject(() => { })).toBe(false);
            expect(isPlainObject(null)).toBe(false);
        });
    });

    describe('isInstanceOf', () => {
        class MyClass { }

        test('should return true if value is an instance of the specified class', () => {
            const instance = new MyClass();
            expect(isInstanceOf(instance, MyClass)).toBe(true);
        });

        test('should return false if value is not an instance of the specified class', () => {
            expect(isInstanceOf({}, MyClass)).toBe(false);
        });
    });

    describe('isEmptyString', () => {
        test('should return true for an empty string', () => {
            expect(isEmptyString('')).toBe(true);
        });

        test('should return false for non-empty strings', () => {
            expect(isEmptyString('Hello')).toBe(false);
        });
    });

    describe('isNonEmptyString', () => {
        test('should return true for a non-empty string', () => {
            expect(isNonEmptyString('Hello')).toBe(true);
        });

        test('should return false for an empty string', () => {
            expect(isNonEmptyString('')).toBe(false);
        });
    });

    describe('isEmptyArray', () => {
        test('should return true for an empty array', () => {
            expect(isEmptyArray([])).toBe(true);
        });

        test('should return false for non-empty arrays', () => {
            expect(isEmptyArray([1, 2, 3])).toBe(false);
        });
    });

    describe('isNonEmptyArray', () => {
        test('should return true for a non-empty array', () => {
            expect(isNonEmptyArray([1, 2, 3])).toBe(true);
        });

        test('should return false for an empty array', () => {
            expect(isNonEmptyArray([])).toBe(false);
        });
    });
});
