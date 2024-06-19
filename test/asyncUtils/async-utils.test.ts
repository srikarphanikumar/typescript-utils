import {
    retry,
    timeout,
    race,
    sequence,
    parallel,
    memoizeAsync,
    debounceAsync,
    throttleAsync,
    batch,
    allSettled,
    mapAsync,
    filterAsync,
    reduceAsync,
    someAsync,
    everyAsync,
    findAsync,
    findIndexAsync,
    forEachAsync,
    retryWithBackoff,
    retryWithDelay,
    sequentialRetry,
} from '../../src/asyncUtils';

describe('asyncUtils', () => {
    describe('retry', () => {
        test('should retry an operation until it succeeds', async () => {
            let count = 0;
            const fn = async () => {
                count++;
                if (count < 3) {
                    throw new Error('Failed');
                }
                return count;
            };
            const result = await retry(fn, 5);
            expect(result).toBe(3);
        });

        test('should throw an error if all retries fail', async () => {
            const fn = async () => {
                throw new Error('Failed');
            };
            await expect(retry(fn, 2)).rejects.toThrow('Failed');
        });
    });

    describe('timeout', () => {
        test('should resolve if operation completes within timeout', async () => {
            const fn = async () => {
                await new Promise(resolve => setTimeout(resolve, 100));
                return 'Success';
            };
            const result = await timeout(fn, 500);
            expect(result).toBe('Success');
        });

        test('should reject if operation exceeds timeout', async () => {
            const fn = async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                return 'Success';
            };
            await expect(timeout(fn, 100)).rejects.toThrow('Operation timed out');
        });
    });

    describe('race', () => {
        test('should return the result of the first operation to complete', async () => {
            const fn1 = async () => {
                await new Promise(resolve => setTimeout(resolve, 100));
                return 'Result 1';
            };
            const fn2 = async () => {
                await new Promise(resolve => setTimeout(resolve, 50));
                return 'Result 2';
            };
            const result = await race([fn1, fn2]);
            expect(result).toBe('Result 2');
        });
    });

    describe('sequence', () => {
        test('should run operations sequentially and return the result of the last operation', async () => {
            const fn1 = async () => {
                await new Promise(resolve => setTimeout(resolve, 100));
                return 'Result 1';
            };
            const fn2 = async () => {
                await new Promise(resolve => setTimeout(resolve, 50));
                return 'Result 2';
            };
            const result = await sequence([fn1, fn2]);
            expect(result).toBe('Result 2');
        });
    });

    describe('parallel', () => {
        test('should run operations in parallel and return the results in the same order', async () => {
            const fn1 = async () => {
                await new Promise(resolve => setTimeout(resolve, 100));
                return 'Result 1';
            };
            const fn2 = async () => {
                await new Promise(resolve => setTimeout(resolve, 50));
                return 'Result 2';
            };
            const result = await parallel([fn1, fn2]);
            expect(result).toEqual(['Result 1', 'Result 2']);
        });
    });

    describe('memoizeAsync', () => {
        test('should memoize the result of an operation based on its arguments', async () => {
            let count = 0;
            const fn = async (x: number) => {
                count++;
                return x * 2;
            };
            const memoizedFn = memoizeAsync(fn);
            const result1 = await memoizedFn(2);
            const result2 = await memoizedFn(2);
            expect(result1).toBe(4);
            expect(result2).toBe(4);
            expect(count).toBe(1); // Should only be called once
        });
    });

    describe('debounceAsync', () => {
        test('should debounce an operation', async () => {
            let count = 0;
            const fn = async () => {
                count++;
                return count;
            };
            const debouncedFn = debounceAsync(fn, 100);
            debouncedFn();
            debouncedFn();
            await new Promise(resolve => setTimeout(resolve, 200));
            const result = await debouncedFn();
            expect(result).toBe(2);
            expect(count).toBe(2);
        }, 10000);
    });

    describe('throttleAsync', () => {
        test('should throttle an operation', async () => {
            let count = 0;
            const fn = async () => {
                count++;
                return count;
            };
            const throttledFn = throttleAsync(fn, 100);
            await throttledFn();
            await throttledFn();
            await new Promise(resolve => setTimeout(resolve, 200));
            await throttledFn();
            expect(await throttledFn()).toBe(4);
        });
    });

    describe('batch', () => {
        test('should batch operations and return results in the original order', async () => {
            const fn1 = async () => 'Result 1';
            const fn2 = async () => 'Result 2';
            const results = await batch([fn1, fn2], 2);
            expect(results).toEqual(['Result 1', 'Result 2']);
        });
    });

    describe('allSettled', () => {
        test('should wait for all promises to settle and return an array of result objects', async () => {
            const promises = [
                Promise.resolve('Resolved 1'),
                Promise.reject('Rejected 2'),
                new Promise(resolve => setTimeout(() => resolve('Resolved 3'), 100)),
            ];
            const results = await allSettled(promises);
            expect(results).toEqual([
                { status: 'fulfilled', value: 'Resolved 1' },
                { status: 'rejected', reason: 'Rejected 2' },
                { status: 'fulfilled', value: 'Resolved 3' },
            ]);
        });
    });

    describe('mapAsync', () => {
        test('should apply an async operation to each element of an array and return the results', async () => {
            const array = [1, 2, 3];
            const asyncMapper = async (value: number) => value * 2;
            const result = await mapAsync(array, asyncMapper);
            expect(result).toEqual([2, 4, 6]);
        });
    });

    describe('filterAsync', () => {
        test('should filter an array asynchronously based on a predicate function', async () => {
            const array = [1, 2, 3, 4, 5];
            const asyncPredicate = async (value: number) => value % 2 === 0;
            const result = await filterAsync(array, asyncPredicate);
            expect(result).toEqual([2, 4]);
        });
    });

    describe('reduceAsync', () => {
        test('should reduce an array asynchronously into a single value', async () => {
            const array = [1, 2, 3, 4, 5];
            const asyncReducer = async (acc: number, value: number) => acc + value;
            const initialValue = 0;
            const result = await reduceAsync(array, asyncReducer, initialValue);
            expect(result).toBe(15);
        });
    });

    describe('someAsync', () => {
        test('should check if at least one element satisfies an async condition', async () => {
            const array = [1, 2, 3, 4, 5];
            const asyncPredicate = async (value: number) => value % 2 === 0;
            const result = await someAsync(array, asyncPredicate);
            expect(result).toBe(true);
        });
    });

    describe('everyAsync', () => {
        test('should check if all elements satisfy an async condition', async () => {
            const array = [2, 4, 6, 8, 10];
            const asyncPredicate = async (value: number) => value % 2 === 0;
            const result = await everyAsync(array, asyncPredicate);
            expect(result).toBe(true);
        });
    });

    describe('findAsync', () => {
        test('should find the first element that satisfies an async condition', async () => {
            const array = [1, 2, 3, 4, 5];
            const asyncPredicate = async (value: number) => value > 2;
            const result = await findAsync(array, asyncPredicate);
            expect(result).toBe(3);
        });
    });

    describe('findIndexAsync', () => {
        test('should find the index of the first element that satisfies an async condition', async () => {
            const array = [1, 2, 3, 4, 5];
            const asyncPredicate = async (value: number) => value > 2;
            const result = await findIndexAsync(array, asyncPredicate);
            expect(result).toBe(2);
        });
    });

    describe('forEachAsync', () => {
        test('should apply an async operation to each element of an array', async () => {
            const array = [1, 2, 3];
            const asyncCallback = async (value: number) => {
                console.log(value);
            };
            await expect(forEachAsync(array, asyncCallback)).resolves.toBeUndefined();
        });
    });

    describe('retryWithBackoff', () => {
        test('should retry an operation with increasing delays between retries', async () => {
            let count = 0;
            const fn = async () => {
                count++;
                if (count < 3) {
                    throw new Error('Failed');
                }
                return count;
            };
            const result = await retryWithBackoff(fn, 3, 100, 500);
            expect(result).toBe(3);
        });
    });

    describe('retryWithDelay', () => {
        test('should retry an operation with a fixed delay between retries', async () => {
            let count = 0;
            const fn = async () => {
                count++;
                if (count < 3) {
                    throw new Error('Failed');
                }
                return count;
            };
            const result = await retryWithDelay(fn, 3, 100);
            expect(result).toBe(3);
        });
    });

    describe('sequentialRetry', () => {
        test('should retry an operation a specified number of times with a delay between retries', async () => {
            let count = 0;
            const fn = async () => {
                count++;
                if (count < 3) {
                    throw new Error('Failed');
                }
                return count;
            };
            const result = await sequentialRetry(fn, 3, 100);
            expect(result).toBe(3);
        });
    });

});
