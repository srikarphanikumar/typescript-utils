/**
 * Generates a unique identifier.
 * @returns {string} A unique identifier.
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2);
}

/**
 * Shuffles the elements of an array.
 * @param {Array<any>} array - The array to shuffle.
 * @returns {Array<any>} A shuffled array.
 */
export function shuffleArray(array: Array<any>): Array<any> {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Creates a deep copy of an object or array.
 * @param {any} value - The value to clone.
 * @returns {any} A deep copy of the value.
 */
export function deepClone(value: any): any {
    return JSON.parse(JSON.stringify(value));
}

/**
 * Pauses execution for a specified amount of time.
 * @param {number} milliseconds - The number of milliseconds to pause.
 * @returns {Promise<void>} A promise that resolves after the specified time.
 */
export function sleep(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Divides an array into smaller arrays of a specified size.
 * @param {Array<any>} array - The array to chunk.
 * @param {number} size - The size of each chunk.
 * @returns {Array<Array<any>>} An array of chunks.
 */
export function chunkArray(array: Array<any>, size: number): Array<Array<any>> {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Measures the time taken to execute a function.
 * @param {Function} fn - The function to measure.
 * @returns {number} The time taken in milliseconds.
 */
export function measureExecutionTime(fn: Function): number {
    const start = Date.now();
    fn();
    const end = Date.now();
    return end - start;
}

/**
 * Parses a query string into an object.
 * @param {string} queryString - The query string to parse.
 * @returns {Object} An object representing the parsed query string.
 */
export function parseQueryString(queryString: string): Object {
    return queryString
        .slice(1)
        .split('&')
        .map(p => p.split('='))
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
}

/**
 * Formats a number as a currency string.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The currency code (e.g., 'USD', 'EUR').
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

/**
 * Checks if a string is a valid email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address is valid, false otherwise.
 */
export function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Generates a random integer between a minimum and maximum value.
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer between min and max.
 */
export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Generates a random hexadecimal color code.
 * @returns {string} A random hexadecimal color code.
 */
export function randomColor(): string {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}


/**
 * Sorts an array of objects by a specified key in ascending order.
 * @param {Array<any>} array - The array of objects to sort.
 * @param {string} key - The key to sort by.
 * @returns {Array<any>} The sorted array.
 */
export function sortByKey(array: Array<any>, key: string): Array<any> {
    return array.slice().sort((a, b) => (a[key] > b[key] ? 1 : -1));
}

/**
 * Generates a range of numbers as an array.
 * @param {number} start - The start of the range.
 * @param {number} end - The end of the range.
 * @param {number} step - The step size between numbers (default is 1).
 * @returns {Array<number>} An array containing the range of numbers.
 */
export function range(start: number, end: number, step: number = 1): Array<number> {
    const length = Math.floor((end - start) / step) + 1;
    return Array.from({ length }, (_, index) => start + index * step);
}

/**
 * Converts a string to title case.
 * @param {string} str - The string to convert to title case.
 * @returns {string} The title cased string.
 */
export function titleCase(str: string): string {
    return str.replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

/**
 * Generates a random alphanumeric string of a specified length.
 * @param {number} length - The length of the generated string.
 * @returns {string} The random alphanumeric string.
 */
export function randomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Returns the difference between two dates in days.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {number} The difference in days.
 */
export function dateDiffInDays(date1: Date, date2: Date): number {
    const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffInMilliseconds / (1000 * 3600 * 24));
}

/**
 * Checks if a value is a valid URL.
 * @param {string} url - The value to check.
 * @returns {boolean} True if the value is a valid URL, false otherwise.
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Generates a random boolean value (true or false).
 * @returns {boolean} A random boolean value.
 */
export function randomBoolean(): boolean {
    return Math.random() < 0.5;
}
