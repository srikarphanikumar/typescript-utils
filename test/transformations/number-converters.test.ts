import {
    formatNumberWithCommas,
    roundNumber,
    generateRandomInteger,
    isPrime,
    toOrdinal,
    toBinary,
    toHexadecimal,
    toRomanNumeral,
    fromRomanNumeral,
    numberToCurrency,
    numberToExponential,
    numberToFraction,
    numberToTime,
    numberToOrdinalSuffix,
    numberToBinary as numToBinary,
    numberToOctal as numToOctal,
    numberToHexadecimal as numToHexadecimal,
} from '../../src/transformations/number-converters';

describe('Numbers Converter', () => {
    describe('formatNumberWithCommas', () => {
        test('should format number with commas', () => {
            expect(formatNumberWithCommas(1000)).toBe('1,000');
            expect(formatNumberWithCommas(1000000)).toBe('1,000,000');
        });
    });

    describe('roundNumber', () => {
        test('should round number to specified decimal places', () => {
            expect(roundNumber(3.14159, 2)).toBe(3.14);
            expect(roundNumber(10.123456, 3)).toBe(10.123);
        });
    });

    describe('generateRandomInteger', () => {
        test('should generate random integer between min and max', () => {
            const min = 1;
            const max = 10;
            const randomInt = generateRandomInteger(min, max);
            expect(randomInt).toBeGreaterThanOrEqual(min);
            expect(randomInt).toBeLessThanOrEqual(max);
        });
    });

    describe('isPrime', () => {
        test('should return true for prime numbers', () => {
            expect(isPrime(2)).toBe(true);
            expect(isPrime(7)).toBe(true);
        });

        test('should return false for non-prime numbers', () => {
            expect(isPrime(1)).toBe(false);
            expect(isPrime(4)).toBe(false);
        });
    });

    describe('toOrdinal', () => {
        test('should convert number to ordinal form', () => {
            expect(toOrdinal(1)).toBe('1st');
            expect(toOrdinal(2)).toBe('2nd');
            expect(toOrdinal(3)).toBe('3rd');
            expect(toOrdinal(4)).toBe('4th');
        });
    });

    describe('toBinary', () => {
        test('should convert number to binary string', () => {
            expect(toBinary(5)).toBe('101');
            expect(toBinary(10)).toBe('1010');
        });
    });

    describe('toHexadecimal', () => {
        test('should convert number to hexadecimal string', () => {
            expect(toHexadecimal(255)).toBe('ff');
            expect(toHexadecimal(1000)).toBe('3e8');
        });
    });

    describe('toRomanNumeral', () => {
        test('should convert number to roman numeral', () => {
            expect(toRomanNumeral(4)).toBe('IV');
            expect(toRomanNumeral(10)).toBe('X');
        });
    });

    describe('fromRomanNumeral', () => {
        test('should convert roman numeral to number', () => {
            expect(fromRomanNumeral('IV')).toBe(4);
            expect(fromRomanNumeral('X')).toBe(10);
        });
    });

    describe('numberToCurrency', () => {
        test('should convert number to currency format', () => {
            expect(numberToCurrency(1234.56, '$')).toBe('$1,234.56');
            expect(numberToCurrency(1000000)).toBe('$1,000,000.00');
        });
    });

    describe('numberToExponential', () => {
        test('should convert number to exponential notation', () => {
            expect(numberToExponential(123456)).toBe('1.23456e+5');
            expect(numberToExponential(0.000123)).toBe('1.23e-4');
        });
    });

    describe('numberToFraction', () => {
        test('should convert number to fraction', () => {
            expect(numberToFraction(0.75)).toBe('3/4');
            expect(numberToFraction(0.3333)).toBe('3333/10000');
        });
    });

    describe('numberToTime', () => {
        test('should convert number of seconds to time format', () => {
            expect(numberToTime(3661)).toBe('1:01:01');
            expect(numberToTime(7200)).toBe('2:00:00');
        });
    });

    describe('numberToOrdinalSuffix', () => {
        test('should convert number to ordinal suffix', () => {
            expect(numberToOrdinalSuffix(1)).toBe('1st');
            expect(numberToOrdinalSuffix(2)).toBe('2nd');
            expect(numberToOrdinalSuffix(3)).toBe('3rd');
            expect(numberToOrdinalSuffix(4)).toBe('4th');
        });
    });

    describe('numberToBinary', () => {
        test('should convert number to binary string', () => {
            expect(numToBinary(21)).toBe('10101');
            expect(numToBinary(10)).toBe('1010');
        });
    });

    describe('numberToOctal', () => {
        test('should convert number to octal string', () => {
            expect(numToOctal(21)).toBe('25');
            expect(numToOctal(10)).toBe('12');
        });
    });

    describe('numberToHexadecimal', () => {
        test('should convert number to hexadecimal string', () => {
            expect(numToHexadecimal(21)).toBe('15');
            expect(numToHexadecimal(255)).toBe('ff');
        });
    });
});
