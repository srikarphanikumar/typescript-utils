type AnyObject = { [key: string]: any };

/**
 * Converts object keys to camelCase.
 * @param {Object} obj - The object to transform.
 * @returns {Object} The object with camelCase keys.
 *
 * @example
 * // Returns { myKey: 'value' }
 * keyToCamelCase({ 'my_key': 'value' });
 */
export function keyToCamelCase(obj: { [key: string]: any }): { [key: string]: any } {
    const camelCaseObject: { [key: string]: any } = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            camelCaseObject[camelCaseKey] = obj[key];
        }
    }
    return camelCaseObject;
}

/**
 * Sorts object keys alphabetically.
 * @param {Object} obj - The object to sort.
 * @returns {Object} The object with sorted keys.
 *
 * @example
 * // Returns { b: 2, a: 1 }
 * sortObjectKeys({ a: 1, b: 2 });
 */
export function sortObjectKeys(obj: { [key: string]: any }): { [key: string]: any } {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObject: { [key: string]: any } = {};
    sortedKeys.forEach(key => {
        sortedObject[key] = obj[key];
    });
    return sortedObject;
}

/**
 * Filters object keys based on a predicate function.
 * @param {Object} obj - The object to filter.
 * @param {(key: string) => boolean} predicate - The predicate function.
 * @returns {Object} The object with filtered keys.
 *
 * @example
 * // Returns { b: 2 }
 * filterObjectKeys({ a: 1, b: 2, c: 3 }, key => key !== 'a' && key !== 'c');
 */
export function filterObjectKeys(
    obj: { [key: string]: any },
    predicate: (key: string) => boolean
): { [key: string]: any } {
    const filteredObject: { [key: string]: any } = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && predicate(key)) {
            filteredObject[key] = obj[key];
        }
    }
    return filteredObject;
}

/**
 * Maps object keys to new keys or values using a mapping function.
 * @param {Object} obj - The object to map.
 * @param {(key: string, value: any) => [string, any]} mapper - The mapping function.
 * @returns {Object} The object with mapped keys or values.
 *
 * @example
 * // Returns { key1: 1, key2: 2, key3: 3 }
 * mapObjectKeys({ a: 1, b: 2, c: 3 }, (key, value) => [`key${value}`, value]);
 */
export function mapObjectKeys(
    obj: { [key: string]: any },
    mapper: (key: string, value: any) => [string, any]
): { [key: string]: any } {
    const mappedObject: { [key: string]: any } = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const [newKey, newValue] = mapper(key, obj[key]);
            mappedObject[newKey] = newValue;
        }
    }
    return mappedObject;
}

/**
 * Flattens a nested object into a single-level object.
 * @param {Object} obj - The object to flatten.
 * @param {string} [prefix=''] - The prefix for nested keys.
 * @returns {Object} The flattened object.
 *
 * @example
 * // Returns { 'a.b': 1, 'a.c.d': 2 }
 * flattenObject({ a: { b: 1, c: { d: 2 } } });
 */
export function flattenObject(obj: { [key: string]: any }, prefix: string = ''): { [key: string]: any } {
    return Object.keys(obj).reduce((acc, key) => {
        const pre = prefix.length ? `${prefix}.` : '';
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            Object.assign(acc, flattenObject(obj[key], pre + key));
        } else {
            acc[pre + key] = obj[key];
        }
        return acc;
    }, {} as { [key: string]: any });
}

/**
 * Creates a deep clone of an object.
 * @param {Object} obj - The object to clone.
 * @returns {Object} The cloned object.
 *
 * @example
 * // Returns { a: { b: 2 } }
 * deepClone({ a: { b: 2 } });
 */
export function deepClone(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    let clone;
    if (Array.isArray(obj)) {
        clone = obj.map(item => deepClone(item));
    } else {
        clone = {} as { [key: string]: any };
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = deepClone(obj[key]);
            }
        }
    }
    return clone;
}

/**
 * Merges two or more objects into a single object.
 * @param {...Object} objects - The objects to merge.
 * @returns {Object} The merged object.
 *
 * @example
 * // Returns { a: 1, b: 2, c: 3 }
 * mergeObjects({ a: 1 }, { b: 2 }, { c: 3 });
 */
export function mergeObjects(...objects: { [key: string]: any }[]): { [key: string]: any } {
    const mergedObject: { [key: string]: any } = {};
    objects.forEach(obj => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                mergedObject[key] = obj[key];
            }
        }
    });
    return mergedObject;
}

/**
 * Converts keys of an object to lowercase.
 * @param {Object} obj - The object to convert.
 * @returns {Object} The object with lowercase keys.
 *
 * @example
 * // Returns { name: 'Alice', age: 30 }
 * convertKeysToLowerCase({ Name: 'Alice', Age: 30 });
 */
export function convertKeysToLowerCase(obj: AnyObject): AnyObject {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase()] = obj[key];
        return acc;
    }, {} as AnyObject);
}

/**
 * Converts keys of an object to uppercase.
 * @param {Object} obj - The object to convert.
 * @returns {Object} The object with uppercase keys.
 *
 * @example
 * // Returns { NAME: 'Alice', AGE: 30 }
 * convertKeysToUpperCase({ name: 'Alice', age: 30 });
 */
export function convertKeysToUpperCase(obj: AnyObject): AnyObject {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key.toUpperCase()] = obj[key];
        return acc;
    }, {} as AnyObject);
}

/**
 * Removes specified keys from an object.
 * @param {Object} obj - The object to modify.
 * @param {string[]} keys - The keys to remove.
 * @returns {Object} The modified object.
 *
 * @example
 * // Returns { name: 'Alice' }
 * removeKeys({ name: 'Alice', age: 30 }, ['age']);
 */
export function removeKeys(obj: { [key: string]: any }, keys: string[]): { [key: string]: any } {
    keys.forEach(key => delete obj[key]);
    return obj;
}

/**
 * Renames keys of an object based on a mapping.
 * @param {Object} obj - The object to modify.
 * @param {Object} mapping - The mapping of old keys to new keys.
 * @returns {Object} The modified object with renamed keys.
 *
 * @example
 * // Returns { firstName: 'Alice', age: 30 }
 * renameKeys({ name: 'Alice', age: 30 }, { name: 'firstName' });
 */
export function renameKeys(obj: { [key: string]: any }, mapping: { [key: string]: string }): { [key: string]: any } {
    Object.keys(mapping).forEach(oldKey => {
        if (obj.hasOwnProperty(oldKey)) {
            obj[mapping[oldKey]] = obj[oldKey];
            delete obj[oldKey];
        }
    });
    return obj;
}

/**
 * Merges two or more objects deeply, preserving nested structures.
 * @param {...Object} objs - The objects to merge.
 * @returns {Object} The merged object.
 *
 * @example
 * // Returns { a: { b: { c: 1, d: 2 } } }
 * deepMerge({ a: { b: { c: 1 } } }, { a: { b: { d: 2 } } });
 */
export function deepMerge(...objs: AnyObject[]): AnyObject {
    const isObject = (obj: any) => obj && typeof obj === 'object';

    return objs.reduce((acc, obj) => {
        if (!isObject(obj)) return acc;
        Object.keys(obj).forEach(key => {
            if (Array.isArray(acc[key]) && Array.isArray(obj[key])) {
                acc[key] = acc[key].concat(obj[key]);
            } else if (isObject(acc[key]) && isObject(obj[key])) {
                acc[key] = deepMerge(acc[key], obj[key]);
            } else {
                acc[key] = obj[key];
            }
        });
        return acc;
    }, {} as AnyObject);
}

/**
 * Finds the differences between two objects, returning keys that are added, removed, or changed.
 * @param {Object} obj1 - The first object.
 * @param {Object} obj2 - The second object.
 * @returns {Object} The differences between the two objects.
 *
 * @example
 * // Returns { added: ['c'], removed: ['b'], changed: ['a'] }
 * objectDiff({ a: 1, b: 2 }, { a: 3, c: 4 });
 */
export function objectDiff(obj1: AnyObject, obj2: AnyObject): AnyObject {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const added = keys2.filter(key => !keys1.includes(key));
    const removed = keys1.filter(key => !keys2.includes(key));
    const changed = keys1.filter(key => keys2.includes(key) && obj1[key] !== obj2[key]);
    return { added, removed, changed };
}


/**
 * Finds the common keys between two or more objects.
 * @param {...Object} objs - The objects to intersect.
 * @returns {Array} The common keys.
 *
 * @example
 * // Returns ['a', 'b']
 * objectIntersection({ a: 1, b: 2 }, { b: 3, c: 4 });
 */
export function objectIntersection(...objs: AnyObject[]): string[] {
    const keys = objs.map(obj => new Set(Object.keys(obj)));
    return [...keys.reduce((acc, set) => new Set([...acc].filter(key => set.has(key))), keys[0])];
}

/**
 * Creates a new object with only selected keys from an existing object.
 * @param {Object} obj - The object to pick keys from.
 * @param {Array<string>} keys - The keys to pick.
 * @returns {Object} The new object with selected keys.
 *
 * @example
 * // Returns { a: 1, b: 2 }
 * objectPick({ a: 1, b: 2, c: 3 }, ['a', 'b']);
 */
export function objectPick(obj: AnyObject, keys: string[]): AnyObject {
    return keys.reduce((acc, key) => {
        if (key in obj) acc[key] = obj[key];
        return acc;
    }, {} as AnyObject);
}

/**
 * Creates a new object without specified keys from an existing object.
 * @param {Object} obj - The object to omit keys from.
 * @param {Array<string>} keys - The keys to omit.
 * @returns {Object} The new object without omitted keys.
 *
 * @example
 * // Returns { c: 3 }
 * objectOmit({ a: 1, b: 2, c: 3 }, ['a', 'b']);
 */
export function objectOmit(obj: AnyObject, keys: string[]): AnyObject {
    return Object.keys(obj).reduce((acc, key) => {
        if (!keys.includes(key)) acc[key] = obj[key];
        return acc;
    }, {} as AnyObject);
}

/**
 * Recursively freezes an object to prevent further changes.
 * @param {Object} obj - The object to freeze.
 * @returns {Object} The frozen object.
 *
 * @example
 * const obj = { a: { b: 1 } };
 * const frozenObj = objectFreeze(obj);
 * frozenObj.a.b = 2; // Error: Cannot assign to read only property 'b' of object
 */
export function objectFreeze(obj: AnyObject): AnyObject {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach(prop => {
        if (obj.hasOwnProperty(prop) && obj[prop] !== null && (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') && !Object.isFrozen(obj[prop])) {
            objectFreeze(obj[prop]);
        }
    });
    return obj;
}

/**
 * Creates a shallow copy of an object.
 * @param {Object} obj - The object to copy.
 * @returns {Object} The shallow copy of the object.
 *
 * @example
 * // Returns { a: 1, b: 2 }
 * const obj = { a: 1, b: 2 };
 * const copy = objectCopy(obj);
 * copy.a = 3; // Does not affect obj
 */
export function objectCopy(obj: AnyObject): AnyObject {
    return { ...obj };
}

/**
 * Deep merges objects, including arrays, with the ability to merge arrays or overwrite them.
 * @param {Object} target - The target object to merge into.
 * @param {...Object} sources - The source objects to merge.
 * @param {boolean} [mergeArrays=false] - Whether to merge arrays or overwrite them.
 * @returns {Object} The merged object.
 *
 * @example
 * // Returns { a: { b: [1, 2, 3] } }
 * deepMergeObjects({ a: { b: [1] } }, { a: { b: [2, 3] } }, true);
 */
export function deepMergeObjects(
    target: AnyObject,
    mergeArrays: boolean = false,
    ...sources: AnyObject[]
): AnyObject {
    const isObject = (obj: any) => obj && typeof obj === 'object';

    return sources.reduce((acc, source) => {
        if (!isObject(source)) return acc;

        Object.keys(source).forEach(key => {
            if (isObject(source[key]) && key in acc) {
                acc[key] = deepMergeObjects(acc[key], mergeArrays, source[key]);
            } else if (Array.isArray(source[key]) && Array.isArray(acc[key])) {
                if (mergeArrays) {
                    acc[key] = acc[key].concat(source[key]);
                } else {
                    acc[key] = source[key];
                }
            } else {
                acc[key] = source[key];
            }
        });

        return acc;
    }, target);
}

/**
 * Flattens an object with a customizable delimiter for nested keys.
 * @param {Object} obj - The object to flatten.
 * @param {string} [delimiter='.'] - The delimiter to use for nested keys.
 * @returns {Object} The flattened object.
 *
 * @example
 * // Returns { 'a.b.c': 1 }
 * objectFlatten({ a: { b: { c: 1 } } });
 */
export function objectFlatten(obj: AnyObject, delimiter: string = '.'): AnyObject {
    const flatten = (obj: AnyObject, prefix: string = ''): AnyObject => {
        return Object.keys(obj).reduce((acc, key) => {
            const prefixedKey = prefix ? `${prefix}${delimiter}${key}` : key;
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
                Object.assign(acc, flatten(obj[key], prefixedKey));
            } else {
                acc[prefixedKey] = obj[key];
            }
            return acc;
        }, {} as AnyObject);
    };

    return flatten(obj);
}

/**
 * Unflattens an object with a customizable delimiter for nested keys.
 * @param {Object} obj - The object to unflatten.
 * @param {string} [delimiter='.'] - The delimiter used for nested keys.
 * @returns {Object} The unflattened object.
 *
 * @example
 * // Returns { a: { b: { c: 1 } } }
 * objectUnflatten({ 'a.b.c': 1 });
 */
export function objectUnflatten(obj: AnyObject, delimiter: string = '.'): AnyObject {
    const unflatten = (obj: AnyObject): AnyObject => {
        return Object.keys(obj).reduce((acc, key) => {
            const keys = key.split(delimiter);
            let nested = acc;
            keys.forEach((innerKey, index) => {
                if (!(innerKey in nested)) {
                    nested[innerKey] = {};
                }
                if (index === keys.length - 1) {
                    nested[innerKey] = obj[key];
                } else {
                    nested = nested[innerKey];
                }
            });
            return acc;
        }, {} as AnyObject);
    };

    return unflatten(obj);
}
