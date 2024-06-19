import {
    generateId,
    shuffleArray,
    deepClone,
    sleep,
    chunkArray,
    measureExecutionTime,
    parseQueryString,
    formatCurrency,
    isValidEmail,
    randomInt,
    randomColor,
    sortByKey,
    range,
    titleCase,
    randomString,
    dateDiffInDays,
    isValidUrl,
    randomBoolean
} from '../../src/misc';

describe('generateId', () => {
    it('should generate a unique identifier', () => {
        const id1 = generateId();
        const id2 = generateId();
        expect(id1).not.toEqual(id2);
    });
});

describe('shuffleArray', () => {
    it('should shuffle the elements of an array', () => {
        const array = [1, 2, 3, 4, 5];
        const shuffled = shuffleArray(array);
        expect(shuffled).not.toEqual(array);
    });
});

describe('deepClone', () => {
    it('should create a deep copy of an object or array', () => {
        const obj = { a: 1, b: { c: 2 } };
        const clone = deepClone(obj);
        expect(clone).toEqual(obj);
        expect(clone).not.toBe(obj);
        expect(clone.b).not.toBe(obj.b);
    });
});

describe('sleep', () => {
    it('should pause execution for a specified amount of time', async () => {
        const start = Date.now();
        await sleep(100);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(100);
    });
});

describe('chunkArray', () => {
    it('should divide an array into smaller arrays of a specified size', () => {
        const array = [1, 2, 3, 4, 5];
        const chunked = chunkArray(array, 2);
        expect(chunked).toEqual([[1, 2], [3, 4], [5]]);
    });
});

describe('measureExecutionTime', () => {
    it('should measure the time taken to execute a function', () => {
        const fn = () => {
            let sum = 0;
            for (let i = 0; i < 1000000; i++) {
                sum += i;
            }
        };
        const time = measureExecutionTime(fn);
        expect(time).toBeGreaterThan(0);
    });
});

describe('parseQueryString', () => {
    it('should parse a query string into an object', () => {
        const queryString = '?key1=value1&key2=value2';
        const parsed = parseQueryString(queryString);
        expect(parsed).toEqual({ key1: 'value1', key2: 'value2' });
    });
});

describe('formatCurrency', () => {
    it('should format a number as a currency string', () => {
        const amount = 123456.789;
        const formatted = formatCurrency(amount, 'USD');
        expect(formatted).toBe('$123,456.79');
    });
});

describe('isValidEmail', () => {
    it('should check if a string is a valid email address', () => {
        expect(isValidEmail('email@example.com')).toBe(true);
        expect(isValidEmail('notanemail')).toBe(false);
    });
});

describe('randomInt', () => {
    it('should generate a random integer between a minimum and maximum value', () => {
        const min = 1;
        const max = 10;
        const random = randomInt(min, max);
        expect(random).toBeGreaterThanOrEqual(min);
        expect(random).toBeLessThanOrEqual(max);
    });
});

describe('randomColor', () => {
    it('should generate a random hexadecimal color code', () => {
        const color = randomColor();
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
});

describe('sortByKey', () => {
    it('should sort an array of objects by a specified key in ascending order', () => {
        const array = [{ key: 2 }, { key: 1 }, { key: 3 }];
        const sorted = sortByKey(array, 'key');
        expect(sorted).toEqual([{ key: 1 }, { key: 2 }, { key: 3 }]);
    });
});

describe('range', () => {
    it('should generate a range of numbers as an array', () => {
        const start = 1;
        const end = 5;
        const rangeArray = range(start, end);
        expect(rangeArray).toEqual([1, 2, 3, 4, 5]);
    });
});

describe('titleCase', () => {
    it('should convert a string to title case', () => {
        const str = 'hello world';
        const titleCased = titleCase(str);
        expect(titleCased).toBe('Hello World');
    });
});

describe('randomString', () => {
    it('should generate a random alphanumeric string of a specified length', () => {
        const length = 10;
        const randomStr = randomString(length);
        expect(randomStr).toHaveLength(length);
        expect(randomStr).toMatch(/^[a-zA-Z0-9]+$/);
    });
});

describe('dateDiffInDays', () => {
    it('should return the difference between two dates in days', () => {
        const date1 = new Date('2024-06-20');
        const date2 = new Date('2024-06-22');
        const diff = dateDiffInDays(date1, date2);
        expect(diff).toBe(2);
    });
});

describe('isValidUrl', () => {
    it('should check if a value is a valid URL', () => {
        expect(isValidUrl('https://www.example.com')).toBe(true);
        expect(isValidUrl('not-a-url')).toBe(false);
    });
});

describe('randomBoolean', () => {
    it('should generate a random boolean value', () => {
        const bool = randomBoolean();
        expect(typeof bool).toBe('boolean');
    });
});
