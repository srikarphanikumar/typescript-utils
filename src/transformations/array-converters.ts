/**
 * Converts an array to a string by joining all elements with the specified separator.
 * @param {T[]} array - The array to convert.
 * @param {string} [separator=','] - The separator to use.
 * @returns {string} The joined string.
 *
 * @example
 * // Returns "apple,banana,orange"
 * arrayToString(['apple', 'banana', 'orange']);
 */
export function arrayToString<T>(array: T[], separator: string = ','): string {
    return array.join(separator);
}

/**
 * Converts an array of key-value pairs into an object.
 * @param {Array<[string, T]>} array - The array of key-value pairs.
 * @returns {Object} The resulting object.
 *
 * @example
 * // Returns { name: 'Alice', age: 30, active: true }
 * arrayToObject([['name', 'Alice'], ['age', 30], ['active', true]]);
 */
export function arrayToObject<T>(array: Array<[string, T]>): { [key: string]: T } {
    return Object.fromEntries(array);
}

/**
 * Converts an object into an array of key-value pairs.
 * @param {Object} obj - The object to convert.
 * @returns {Array<[string, any]>} The array of key-value pairs.
 *
 * @example
 * // Returns [['name', 'Alice'], ['age', 30], ['active', true]]
 * objectToArray({ name: 'Alice', age: 30, active: true });
 */
export function objectToArray(obj: { [key: string]: any }): Array<[string, any]> {
    return Object.entries(obj);
}

/**
 * Joins the elements of an array into a string with the specified separator.
 * @param {Array} array - The array to join.
 * @param {string} separator - The separator to use between elements.
 * @returns {string} The joined string.
 *
 * @example
 * // Returns "apple,banana,orange"
 * joinArray(["apple", "banana", "orange"], ",");
 */
export function joinArray(array: any[], separator: string): string {
    return array.join(separator);
}

/**
 * Splits a string into an array of substrings based on a specified separator.
 * @param {string} str - The string to split.
 * @param {string} separator - The separator to use for splitting.
 * @returns {Array} The array of substrings.
 *
 * @example
 * // Returns ["apple", "banana", "orange"]
 * splitString("apple,banana,orange", ",");
 */
export function splitString(str: string, separator: string): any[] {
    return str.split(separator);
}

/**
 * Checks if an array includes a certain element, returning true or false as appropriate.
 * @param {Array} array - The array to check.
 * @param {*} element - The element to search for.
 * @returns {boolean} True if the element is found, otherwise false.
 *
 * @example
 * // Returns true
 * arrayIncludes([1, 2, 3], 2);
 */
export function arrayIncludes(array: any[], element: any): boolean {
    return array.includes(element);
}

/**
 * Removes the first occurrence of a specified element from an array.
 * @param {Array} array - The array to modify.
 * @param {*} element - The element to remove.
 * @returns {Array} The modified array.
 *
 * @example
 * // Returns [1, 3]
 * removeElement([1, 2, 3], 2);
 */
export function removeElement(array: any[], element: any): any[] {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}

/**
 * Removes duplicate elements from an array.
 * @param {Array} array - The array to modify.
 * @returns {Array} The modified array with duplicate elements removed.
 *
 * @example
 * // Returns [1, 2, 3]
 * removeDuplicates([1, 2, 2, 3, 1]);
 */
export function removeDuplicates(array: any[]): any[] {
    return Array.from(new Set(array));
}

/**
 * Flattens a nested array (containing nested arrays) into a single flat array.
 * @param {Array} array - The array to flatten.
 * @returns {Array} The flattened array.
 *
 * @example
 * // Returns [1, 2, 3, 4, 5]
 * flattenArray([1, [2, [3]], 4, [5]]);
 */
export function flattenArray(array: any[]): any[] {
    return array.flat(Infinity);
}
/**
 * Returns the first element of an array.
 * @param {Array} array - The array.
 * @returns {*} The first element of the array.
 *
 * @example
 * // Returns 1
 * firstElement([1, 2, 3]);
 */
export function firstElement(array: any[]): any {
    return array[0];
}

/**
 * Returns the last element of an array.
 * @param {Array} array - The array.
 * @returns {*} The last element of the array.
 *
 * @example
 * // Returns 3
 * lastElement([1, 2, 3]);
 */
export function lastElement(array: any[]): any {
    return array[array.length - 1];
}

/**
 * Returns a new array with the specified number of elements removed from the end of the array.
 * @param {Array} array - The array.
 * @param {number} count - The number of elements to remove.
 * @returns {Array} A new array with elements removed.
 *
 * @example
 * // Returns [1, 2]
 * dropRight([1, 2, 3], 1);
 */
export function dropRight(array: any[], count: number): any[] {
    return array.slice(0, array.length - count);
}

/**
 * Returns a new array with the specified number of elements removed from the beginning of the array.
 * @param {Array} array - The array.
 * @param {number} count - The number of elements to remove.
 * @returns {Array} A new array with elements removed.
 *
 * @example
 * // Returns [2, 3]
 * drop([1, 2, 3], 1);
 */
export function drop(array: any[], count: number): any[] {
    return array.slice(count);
}

/**
 * Returns a new array with the elements reversed.
 * @param {Array} array - The array.
 * @returns {Array} A new array with reversed elements.
 *
 * @example
 * // Returns [3, 2, 1]
 * reverse([1, 2, 3]);
 */
export function reverseArray(array: any[]): any[] {
    return array.slice().reverse();
}

/**
 * Returns a new array with the elements sorted in ascending order.
 * @param {Array} array - The array.
 * @returns {Array} A new array with sorted elements.
 *
 * @example
 * // Returns [1, 2, 3]
 * sort([3, 1, 2]);
 */
export function sort(array: any[]): any[] {
    return array.slice().sort();
}
