import {
    isBoolean,
    isNumber,
    isString,
    isObject,
    isFunction,
    isNull,
    isUndefined,
    isSymbol,
    isBigInt,
    isDate,
    isArray,
    isRegExp,
    isError
} from '../../src/guards';

describe('Guard Methods', () => {
    describe('isBoolean', () => {
        test('should return true if the value is a boolean', () => {
            expect(isBoolean(true)).toBe(true);
            expect(isBoolean(false)).toBe(true);
            expect(isBoolean(1)).toBe(false);
        });
    });

    describe('isNumber', () => {
        test('should return true if the value is a number', () => {
            expect(isNumber(1)).toBe(true);
            expect(isNumber('1')).toBe(false);
        });
    });

    describe('isString', () => {
        test('should return true if the value is a string', () => {
            expect(isString('hello')).toBe(true);
            expect(isString(1)).toBe(false);
        });
    });

    describe('isObject', () => {
        test('should return true if the value is an object (excluding null)', () => {
            expect(isObject({})).toBe(true);
            expect(isObject(null)).toBe(false);
        });
    });

    describe('isFunction', () => {
        test('should return true if the value is a function', () => {
            expect(isFunction(() => { })).toBe(true);
            expect(isFunction('')).toBe(false);
        });
    });

    describe('isNull', () => {
        test('should return true if the value is null', () => {
            expect(isNull(null)).toBe(true);
            expect(isNull(undefined)).toBe(false);
        });
    });

    describe('isUndefined', () => {
        test('should return true if the value is undefined', () => {
            expect(isUndefined(undefined)).toBe(true);
            expect(isUndefined(null)).toBe(false);
        });
    });

    describe('isSymbol', () => {
        test('should return true if the value is a symbol', () => {
            expect(isSymbol(Symbol())).toBe(true);
            expect(isSymbol('')).toBe(false);
        });
    });

    describe('isBigInt', () => {
        test('should return true if the value is a BigInt', () => {
            expect(isBigInt(BigInt(1))).toBe(true);
            expect(isBigInt(1)).toBe(false);
        });
    });

    describe('isDate', () => {
        test('should return true if the value is a Date object', () => {
            expect(isDate(new Date())).toBe(true);
            expect(isDate('')).toBe(false);
        });
    });

    describe('isArray', () => {
        test('should return true if the value is an array', () => {
            expect(isArray([])).toBe(true);
            expect(isArray('')).toBe(false);
        });
    });

    describe('isRegExp', () => {
        test('should return true if the value is a regular expression', () => {
            expect(isRegExp(/test/)).toBe(true);
            expect(isRegExp('')).toBe(false);
        });
    });

    describe('isError', () => {
        test('should return true if the value is an error object', () => {
            expect(isError(new Error())).toBe(true);
            expect(isError('')).toBe(false);
        });
    });
});
