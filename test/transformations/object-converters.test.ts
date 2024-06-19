import {
    keyToCamelCase,
    sortObjectKeys,
    filterObjectKeys,
    mapObjectKeys,
    flattenObject,
    deepClone,
    mergeObjects,
    convertKeysToLowerCase,
    convertKeysToUpperCase,
    removeKeys,
    renameKeys,
    deepMerge,
    objectDiff,
    objectIntersection,
    objectPick,
    objectOmit,
    objectFreeze,
    objectCopy,
    deepMergeObjects,
    objectFlatten,
    objectUnflatten,
} from '../../src/transformations/object-conveters';

describe('Object Converter Functions', () => {
    describe('keyToCamelCase', () => {
        test('converts object keys to camelCase', () => {
            expect(keyToCamelCase({ 'my_key': 'value' })).toEqual({ myKey: 'value' });
        });
    });

    describe('sortObjectKeys', () => {
        test('sorts object keys alphabetically', () => {
            expect(sortObjectKeys({ a: 1, b: 2 })).toEqual({ b: 2, a: 1 });
        });
    });

    describe('filterObjectKeys', () => {
        test('filters object keys based on a predicate function', () => {
            expect(filterObjectKeys({ a: 1, b: 2, c: 3 }, key => key !== 'a' && key !== 'c')).toEqual({ b: 2 });
        });
    });

    describe('mapObjectKeys', () => {
        test('maps object keys to new keys or values using a mapping function', () => {
            expect(mapObjectKeys({ a: 1, b: 2, c: 3 }, (key, value) => [`key${value}`, value])).toEqual({
                key1: 1,
                key2: 2,
                key3: 3,
            });
        });
    });

    describe('flattenObject', () => {
        test('flattens a nested object into a single-level object', () => {
            expect(flattenObject({ a: { b: 1, c: { d: 2 } } })).toEqual({ 'a.b': 1, 'a.c.d': 2 });
        });
    });

    describe('deepClone', () => {
        test('creates a deep clone of an object', () => {
            const obj = { a: { b: 2 } };
            const clone = deepClone(obj);
            clone.a.b = 3;
            expect(obj.a.b).toEqual(2);
        });
    });

    describe('mergeObjects', () => {
        test('merges two or more objects into a single object', () => {
            expect(mergeObjects({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
        });
    });

    describe('convertKeysToLowerCase', () => {
        test('converts keys of an object to lowercase', () => {
            expect(convertKeysToLowerCase({ Name: 'Alice', Age: 30 })).toEqual({ name: 'Alice', age: 30 });
        });
    });

    describe('convertKeysToUpperCase', () => {
        test('converts keys of an object to uppercase', () => {
            expect(convertKeysToUpperCase({ name: 'Alice', age: 30 })).toEqual({ NAME: 'Alice', AGE: 30 });
        });
    });

    describe('removeKeys', () => {
        test('removes specified keys from an object', () => {
            expect(removeKeys({ name: 'Alice', age: 30 }, ['age'])).toEqual({ name: 'Alice' });
        });
    });

    describe('renameKeys', () => {
        test('renames keys of an object based on a mapping', () => {
            expect(renameKeys({ name: 'Alice', age: 30 }, { name: 'firstName' })).toEqual({ firstName: 'Alice', age: 30 });
        });
    });

    describe('deepMerge', () => {
        test('deep merges objects, including arrays, with the ability to merge arrays or overwrite them', () => {
            expect(deepMerge({ a: { b: [1] } }, { a: { b: [2, 3] } })).toEqual({ a: { b: [1, 2, 3] } });
        });
    });

    describe('objectDiff', () => {
        test('finds the differences between two objects, returning keys that are added, removed, or changed', () => {
            expect(objectDiff({ a: 1, b: 2 }, { a: 3, c: 4 })).toEqual({ added: ['c'], removed: ['b'], changed: ['a'] });
        });
    });

    describe('objectIntersection', () => {
        test('finds the common keys between two or more objects', () => {
            expect(objectIntersection({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual(['b']);
        });
    });

    describe('objectPick', () => {
        test('creates a new object with only selected keys from an existing object', () => {
            expect(objectPick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ a: 1, b: 2 });
        });
    });

    describe('objectOmit', () => {
        test('creates a new object without specified keys from an existing object', () => {
            expect(objectOmit({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ c: 3 });
        });
    });

    describe('objectFreeze', () => {
        test('recursively freezes an object to prevent further changes', () => {
            const obj = { a: { b: 1 } };
            const frozenObj = objectFreeze(obj);
            expect(() => { frozenObj.a.b = 2; }).toThrowError();
        });
    });

    describe('objectCopy', () => {
        test('creates a shallow copy of an object', () => {
            const obj = { a: 1, b: 2 };
            const copy = objectCopy(obj);
            copy.a = 3;
            expect(obj.a).toEqual(1);
        });
    });

    describe('objectFlatten', () => {
        test('flattens an object with a customizable delimiter for nested keys', () => {
            expect(objectFlatten({ a: { b: { c: 1 } } })).toEqual({ 'a.b.c': 1 });
        });
    });

    describe('objectUnflatten', () => {
        test('unflattens an object with a customizable delimiter for nested keys', () => {
            expect(objectUnflatten({ 'a.b.c': 1 })).toEqual({ a: { b: { c: 1 } } });
        });
    });
});
