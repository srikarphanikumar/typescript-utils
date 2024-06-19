import {
    firstElement,
    lastElement,
    dropRight,
    drop,
    reverseArray,
    sort
} from '../../src/transformations/array-converters';

describe('Array Converters', () => {
    describe('firstElement', () => {
        it('should return the first element of the array', () => {
            expect(firstElement([1, 2, 3])).toBe(1);
        });
    });

    describe('lastElement', () => {
        it('should return the last element of the array', () => {
            expect(lastElement([1, 2, 3])).toBe(3);
        });
    });

    describe('dropRight', () => {
        it('should return a new array with specified number of elements removed from the end', () => {
            expect(dropRight([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 3]);
        });
    });

    describe('drop', () => {
        it('should return a new array with specified number of elements removed from the beginning', () => {
            expect(drop([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
        });
    });

    describe('reverse', () => {
        it('should return a new array with elements reversed', () => {
            expect(reverseArray([1, 2, 3])).toEqual([3, 2, 1]);
        });
    });

    describe('sort', () => {
        it('should return a new array with elements sorted in ascending order', () => {
            expect(sort([3, 1, 2])).toEqual([1, 2, 3]);
        });
    });
});
