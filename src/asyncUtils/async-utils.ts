/**
 * Retries an asynchronous operation a specified number of times until it succeeds or reaches the maximum number of retries.
 * @param {Function} fn - The asynchronous operation to retry.
 * @param {number} retries - The maximum number of retries.
 * @returns {Promise<any>} A promise that resolves when the operation succeeds or rejects when all retries are exhausted.
 *
 * @example
 * const result = await retry(() => fetchData(url), 3);
 */
export async function retry(fn: () => Promise<any>, retries: number): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) {
                throw error;
            }
        }
    }
}

/**
 * Adds a timeout to an asynchronous operation, ensuring it completes within a specified time limit.
 * @param {Function} fn - The asynchronous operation to add a timeout to.
 * @param {number} timeout - The timeout duration in milliseconds.
 * @returns {Promise<any>} A promise that resolves with the result of the operation if it completes within the timeout, or rejects if it times out.
 *
 * @example
 * const result = await timeout(() => fetchData(url), 5000);
 */
export async function timeout(fn: () => Promise<any>, timeout: number): Promise<any> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Operation timed out'));
        }, timeout);
        fn().then(
            result => {
                clearTimeout(timer);
                resolve(result);
            },
            error => {
                clearTimeout(timer);
                reject(error);
            }
        );
    });
}

/**
 * Races multiple asynchronous operations and returns the result of the first one to complete.
 * @param {Function[]} fns - The array of asynchronous operations to race.
 * @returns {Promise<any>} A promise that resolves with the result of the first operation to complete.
 *
 * @example
 * const result = await race([fetchData(url1), fetchData(url2)]);
 */
export function race(fns: (() => Promise<any>)[]): Promise<any> {
    return Promise.race(fns.map(fn => fn()));
}

/**
 * Runs asynchronous operations sequentially, waiting for each to complete before starting the next one.
 * @param {Function[]} fns - The array of asynchronous operations to run sequentially.
 * @returns {Promise<any>} A promise that resolves with the result of the last operation.
 *
 * @example
 * const result = await sequence([() => fetchData(url1), () => fetchData(url2)]);
 */
export async function sequence(fns: (() => Promise<any>)[]): Promise<any> {
    let result;
    for (const fn of fns) {
        result = await fn();
    }
    return result;
}

/**
 * Runs multiple asynchronous operations in parallel and returns the results in the same order.
 * @param {Function[]} fns - The array of asynchronous operations to run in parallel.
 * @returns {Promise<any[]>} A promise that resolves with an array of results in the same order as the input operations.
 *
 * @example
 * const results = await parallel([() => fetchData(url1), () => fetchData(url2)]);
 */
export function parallel(fns: (() => Promise<any>)[]): Promise<any[]> {
    return Promise.all(fns.map(fn => fn()));
}

/**
 * Memoizes the result of an asynchronous operation based on its arguments, so that subsequent calls with the same arguments return the cached result.
 * @param {Function} fn - The asynchronous operation to memoize.
 * @returns {Function} A memoized version of the function.
 *
 * @example
 * const memoizedFn = memoizeAsync(fetchData);
 * const result1 = await memoizedFn(url1); // fetched from server
 * const result2 = await memoizedFn(url1); // returned from cache
 */
export function memoizeAsync(fn: (...args: any[]) => Promise<any>): (...args: any[]) => Promise<any> {
    const cache = new Map<string, Promise<any>>();
    return async (...args) => {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
}

/**
 * Debounces an asynchronous operation, ensuring it is not called too frequently, but only after a certain delay has passed since the last call.
 * @param {Function} fn - The asynchronous operation to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} A debounced version of the function.
 *
 * @example
 * const debouncedFn = debounceAsync(fetchData, 500);
 * debouncedFn(url); // called after 500ms if not called again
 */
export function debounceAsync(fn: (...args: any[]) => Promise<any>, delay: number): (...args: any[]) => Promise<any> {
    let timer: NodeJS.Timeout | null = null;

    return (...args) => {
        if (timer) clearTimeout(timer);

        return new Promise((resolve) => {
            timer = setTimeout(async () => {
                resolve(await fn(...args));
                timer = null;
            }, delay);
        });
    };
}

/**
 * Throttles an asynchronous operation, ensuring it is not called more than once per specified interval.
 * @param {Function} fn - The asynchronous operation to throttle.
 * @param {number} interval - The throttle interval in milliseconds.
 * @returns {Function} A throttled version of the function.
 *
 * @example
 * const throttledFn = throttleAsync(fetchData, 1000);
 * throttledFn(url1); // called immediately
 * throttledFn(url2); // called after 1000ms
 */
export function throttleAsync(fn: (...args: any[]) => Promise<any>, interval: number): (...args: any[]) => Promise<any> {
    let lastCallTime = 0;
    let pendingPromise: Promise<any> | null = null;
    let pendingArgs: any[] | null = null;

    const executeFn = async (...args: any[]) => {
        lastCallTime = Date.now();
        return fn(...args);
    };

    return async (...args) => {
        const now = Date.now();

        if (now - lastCallTime >= interval) {
            // If enough time has passed, execute immediately
            if (pendingPromise) {
                // If there was a pending call, resolve it first
                const result = await pendingPromise;
                pendingPromise = null;
                return result;
            }
            return executeFn(...args);
        } else {
            // If there is a pending call, update its arguments
            pendingArgs = args;
            if (!pendingPromise) {
                pendingPromise = new Promise(resolve => {
                    setTimeout(async () => {
                        const result = await executeFn(...(pendingArgs || args));
                        pendingPromise = null;
                        resolve(result);
                    }, interval - (now - lastCallTime));
                });
            }
            return pendingPromise;
        }
    };
}

/**
 * Batches multiple asynchronous operations into groups and executes them in parallel, returning the results in the original order.
 * @param {Function[]} fns - The array of asynchronous operations to batch.
 * @param {number} batchSize - The size of each batch.
 * @returns {Promise<any[]>} A promise that resolves with an array of results in the original order.
 *
 * @example
 * const results = await batch([() => fetchData(url1), () => fetchData(url2)], 2);
 */
export async function batch(fns: (() => Promise<any>)[], batchSize: number): Promise<any[]> {
    const batches = [];
    for (let i = 0; i < fns.length; i += batchSize) {
        batches.push(fns.slice(i, i + batchSize));
    }
    const results = await Promise.all(
        batches.map(batch =>
            Promise.all(batch.map(fn => fn())).then(batchResults => batchResults.flat())
        )
    );
    return results.flat();
}

/**
 * Waits for all the provided promises to settle (either resolve or reject) and returns an array of result objects for each promise.
 * @param {Promise<any>[]} promises - The array of promises to wait for.
 * @returns {Promise<{ status: 'fulfilled' | 'rejected'; value?: any; reason?: any; }[]>} A promise that resolves with an array of result objects for each promise.
 *
 * @example
 * const promises = [fetchData(url1), fetchData(url2)];
 * const results = await allSettled(promises);
 * results.forEach(result => {
 *     if (result.status === 'fulfilled') {
 *         console.log('Fulfilled:', result.value);
 *     } else {
 *         console.log('Rejected:', result.reason);
 *     }
 * });
 */
export function allSettled(promises: Promise<any>[]): Promise<{ status: 'fulfilled' | 'rejected'; value?: any; reason?: any; }[]> {
    return Promise.allSettled(promises);
}

/**
 * Applies an asynchronous operation to each element of an array and returns an array of results.
 * @param {Array<any>} array - The array to map over.
 * @param {(value: any, index: number, array: Array<any>) => Promise<any>} asyncMapper - The asynchronous mapping function.
 * @returns {Promise<Array<any>>} A promise that resolves to an array of mapped results.
 */
export async function mapAsync(array: Array<any>, asyncMapper: (value: any, index: number, array: Array<any>) => Promise<any>): Promise<Array<any>> {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const mappedValue = await asyncMapper(array[i], i, array);
        result.push(mappedValue);
    }
    return result;
}

/**
 * Filters an array asynchronously based on a predicate function.
 * @param {Array<any>} array - The array to filter.
 * @param {(value: any, index: number, array: Array<any>) => Promise<boolean>} asyncPredicate - The asynchronous predicate function.
 * @returns {Promise<Array<any>>} A promise that resolves to a filtered array.
 */
export async function filterAsync(array: Array<any>, asyncPredicate: (value: any, index: number, array: Array<any>) => Promise<boolean>): Promise<Array<any>> {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const isInclude = await asyncPredicate(array[i], i, array);
        if (isInclude) {
            result.push(array[i]);
        }
    }
    return result;
}

/**
 * Reduces an array asynchronously into a single value.
 * @param {Array<any>} array - The array to reduce.
 * @param {(accumulator: any, value: any, index: number, array: Array<any>) => Promise<any>} asyncReducer - The asynchronous reducer function.
 * @param {any} initialValue - The initial value of the accumulator.
 * @returns {Promise<any>} A promise that resolves to the final reduced value.
 */
export async function reduceAsync(array: Array<any>, asyncReducer: (accumulator: any, value: any, index: number, array: Array<any>) => Promise<any>, initialValue: any): Promise<any> {
    let accumulator = initialValue;
    for (let i = 0; i < array.length; i++) {
        accumulator = await asyncReducer(accumulator, array[i], i, array);
    }
    return accumulator;
}

/**
 * Checks if at least one element in an array satisfies an asynchronous condition.
 * @param {Array<any>} array - The array to check.
 * @param {(value: any, index: number, array: Array<any>) => Promise<boolean>} asyncPredicate - The asynchronous predicate function.
 * @returns {Promise<boolean>} A promise that resolves to true if at least one element satisfies the condition, false otherwise.
 */
export async function someAsync(array: Array<any>, asyncPredicate: (value: any, index: number, array: Array<any>) => Promise<boolean>): Promise<boolean> {
    for (let i = 0; i < array.length; i++) {
        if (await asyncPredicate(array[i], i, array)) {
            return true;
        }
    }
    return false;
}

/**
 * Checks if all elements in an array satisfy an asynchronous condition.
 * @param {Array<any>} array - The array to check.
 * @param {(value: any, index: number, array: Array<any>) => Promise<boolean>} asyncPredicate - The asynchronous predicate function.
 * @returns {Promise<boolean>} A promise that resolves to true if all elements satisfy the condition, false otherwise.
 */
export async function everyAsync(array: Array<any>, asyncPredicate: (value: any, index: number, array: Array<any>) => Promise<boolean>): Promise<boolean> {
    for (let i = 0; i < array.length; i++) {
        if (!(await asyncPredicate(array[i], i, array))) {
            return false;
        }
    }
    return true;
}

/**
 * Finds the first element in an array that satisfies an asynchronous condition.
 * @param {Array<any>} array - The array to search.
 * @param {(value: any, index: number, array: Array<any>) => Promise<boolean>} asyncPredicate - The asynchronous predicate function.
 * @returns {Promise<any | undefined>} A promise that resolves to the first element that satisfies the condition, or undefined if none is found.
 */
export async function findAsync(array: Array<any>, asyncPredicate: (value: any, index: number, array: Array<any>) => Promise<boolean>): Promise<any | undefined> {
    for (let i = 0; i < array.length; i++) {
        if (await asyncPredicate(array[i], i, array)) {
            return array[i];
        }
    }
    return undefined;
}

/**
 * Finds the index of the first element in an array that satisfies an asynchronous condition.
 * @param {Array<any>} array - The array to search.
 * @param {(value: any, index: number, array: Array<any>) => Promise<boolean>} asyncPredicate - The asynchronous predicate function.
 * @returns {Promise<number>} A promise that resolves to the index of the first element that satisfies the condition, or -1 if none is found.
 */
export async function findIndexAsync(array: Array<any>, asyncPredicate: (value: any, index: number, array: Array<any>) => Promise<boolean>): Promise<number> {
    for (let i = 0; i < array.length; i++) {
        if (await asyncPredicate(array[i], i, array)) {
            return i;
        }
    }
    return -1;
}

/**
 * Iterates over an array and applies an asynchronous operation to each element.
 * @param {Array<any>} array - The array to iterate over.
 * @param {(value: any, index: number, array: Array<any>) => Promise<void>} asyncCallback - The asynchronous callback function.
 * @returns {Promise<void>} A promise that resolves when all elements have been processed.
 */
export async function forEachAsync(array: Array<any>, asyncCallback: (value: any, index: number, array: Array<any>) => Promise<void>): Promise<void> {
    for (let i = 0; i < array.length; i++) {
        await asyncCallback(array[i], i, array);
    }
}

/**
 * Retries an asynchronous operation with increasing delays between retries (backoff strategy).
 * @param {() => Promise<any>} asyncOperation - The asynchronous operation to retry.
 * @param {number} maxRetries - The maximum number of retries.
 * @param {number} baseDelay - The base delay in milliseconds.
 * @param {number} maxDelay - The maximum delay in milliseconds.
 * @returns {Promise<any>} A promise that resolves to the result of the operation.
 */
export async function retryWithBackoff(asyncOperation: () => Promise<any>, maxRetries: number, baseDelay: number, maxDelay: number): Promise<any> {
    let retries = 0;
    let delay = baseDelay;
    while (retries < maxRetries) {
        try {
            return await asyncOperation();
        } catch (error) {
            retries++;
            await new Promise(resolve => setTimeout(resolve, delay));
            delay = Math.min(delay * 2, maxDelay);
        }
    }
    throw new Error('Retry limit exceeded');
}

/**
 * Retries an asynchronous operation with a fixed delay between retries.
 * @param {() => Promise<any>} asyncOperation - The asynchronous operation to retry.
 * @param {number} maxRetries - The maximum number of retries.
 * @param {number} delay - The delay in milliseconds between retries.
 * @returns {Promise<any>} A promise that resolves to the result of the operation.
 */
export async function retryWithDelay(asyncOperation: () => Promise<any>, maxRetries: number, delay: number): Promise<any> {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            return await asyncOperation();
        } catch (error) {
            retries++;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('Retry limit exceeded');
}

/**
 * Retries an asynchronous operation a specified number of times, with a delay between each retry, and gives up if it fails after all retries.
 * @param {() => Promise<any>} asyncOperation - The asynchronous operation to retry.
 * @param {number} retries - The number of retries.
 * @param {number} delay - The delay in milliseconds between retries.
 * @returns {Promise<any>} A promise that resolves to the result of the operation.
 */
export async function sequentialRetry(asyncOperation: () => Promise<any>, retries: number, delay: number): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            return await asyncOperation();
        } catch (error) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('Retry limit exceeded');
}

/**
 * Wraps an asynchronous operation with a circuit breaker pattern to prevent repeated failures from overloading a system.
 * @param {() => Promise<any>} asyncOperation - The asynchronous operation to wrap.
 * @param {number} maxFailures - The maximum number of consecutive failures before opening the circuit.
 * @param {number} cooldownPeriod - The cooldown period in milliseconds after opening the circuit.
 * @returns {Promise<any>} A promise that resolves to the result of the operation.
 */
export async function circuitBreaker(asyncOperation: () => Promise<any>, maxFailures: number, cooldownPeriod: number): Promise<any> {
    let failures = 0;
    let circuitOpen = false;
    return async function () {
        if (circuitOpen) {
            throw new Error('Circuit is open');
        }
        try {
            const result = await asyncOperation();
            failures = 0;
            return result;
        } catch (error) {
            failures++;
            if (failures >= maxFailures) {
                circuitOpen = true;
                setTimeout(() => { circuitOpen = false; failures = 0; }, cooldownPeriod);
            }
            throw error;
        }
    }();
}
