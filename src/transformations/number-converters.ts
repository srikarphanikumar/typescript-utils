/**
 * Converts a number to a formatted string with commas for thousands separator.
 * @param {number} number - The number to format.
 * @returns {string} The formatted string.
 *
 * @example
 * // Returns "1,234,567"
 * formatNumberWithCommas(1234567);
 */
export function formatNumberWithCommas(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Rounds a number to the specified number of decimal places.
 * @param {number} number - The number to round.
 * @param {number} decimalPlaces - The number of decimal places to round to.
 * @returns {number} The rounded number.
 *
 * @example
 * // Returns 3.14
 * roundNumber(3.14159, 2);
 */
export function roundNumber(number: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
}

/**
 * Generates a random integer between the specified minimum and maximum values.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The random integer.
 *
 * @example
 * // Returns a random integer between 1 and 10
 * generateRandomInteger(1, 10);
 */
export function generateRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks if a number is prime.
 * @param {number} number - The number to check.
 * @returns {boolean} True if the number is prime, false otherwise.
 *
 * @example
 * // Returns true
 * isPrime(7);
 */
export function isPrime(number: number): boolean {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    let i = 5;
    while (i * i <= number) {
        if (number % i === 0 || number % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

/**
 * Converts a number to its ordinal form (e.g., 1st, 2nd, 3rd).
 * @param {number} number - The number to convert.
 * @returns {string} The ordinal form of the number.
 *
 * @example
 * // Returns "1st"
 * toOrdinal(1);
 */
export function toOrdinal(number: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = number % 100;
    return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

/**
 * Converts a number to a binary string.
 * @param {number} number - The number to convert.
 * @returns {string} The binary string.
 *
 * @example
 * // Returns "101"
 * toBinary(5);
 */
export function toBinary(number: number): string {
    return number.toString(2);
}

/**
 * Converts a number to a hexadecimal string.
 * @param {number} number - The number to convert.
 * @returns {string} The hexadecimal string.
 *
 * @example
 * // Returns "ff"
 * toHexadecimal(255);
 */
export function toHexadecimal(number: number): string {
    return number.toString(16);
}

/**
 * Converts a number to a roman numeral.
 * @param {number} number - The number to convert.
 * @returns {string} The roman numeral.
 *
 * @example
 * // Returns "IV"
 * toRomanNumeral(4);
 */
export function toRomanNumeral(number: number): string {
    const romanNumerals: { [key: number]: string } = {
        1: 'I',
        4: 'IV',
        5: 'V',
        9: 'IX',
        10: 'X',
        40: 'XL',
        50: 'L',
        90: 'XC',
        100: 'C',
        400: 'CD',
        500: 'D',
        900: 'CM',
        1000: 'M'
    };

    let result = '';
    Object.keys(romanNumerals)
        .reverse()
        .forEach(value => {
            const intValue = parseInt(value);
            while (number >= intValue) {
                result += romanNumerals[intValue];
                number -= intValue;
            }
        });
    return result;
}

/**
 * Converts a roman numeral to a number.
 * @param {string} romanNumeral - The roman numeral to convert.
 * @returns {number} The number.
 *
 * @example
 * // Returns 4
 * fromRomanNumeral('IV');
 */
export function fromRomanNumeral(romanNumeral: string): number {
    const romanNumerals: { [key: string]: number } = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let result = 0;
    for (let i = 0; i < romanNumeral.length; i++) {
        const current = romanNumerals[romanNumeral[i]];
        const next = romanNumerals[romanNumeral[i + 1]];
        if (current < next) {
            result += next - current;
            i++;
        } else {
            result += current;
        }
    }
    return result;
}

/**
 * Converts a number to its equivalent currency format.
 * @param {number} num - The number to convert.
 * @param {string} [currencySymbol="$"] - The currency symbol to use.
 * @returns {string} The currency format of the number.
 *
 * @example
 * // Returns "$1,234.56"
 * numberToCurrency(1234.56, "$");
 */
export function numberToCurrency(num: number, currencySymbol: string = "$"): string {
    return `${currencySymbol}${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

/**
 * Converts a number to its exponential notation.
 * @param {number} num - The number to convert.
 * @returns {string} The exponential notation of the number.
 *
 * @example
 * // Returns "1.23456e+5"
 * numberToExponential(123456);
 */
export function numberToExponential(num: number): string {
    return num.toExponential();
}

/**
 * Converts a decimal number to a fraction string.
 * @param {number} num - The decimal number.
 * @returns {string} The fraction string.
 */
/**
 * Converts a decimal number to a fraction string.
 * @param {number} num - The decimal number.
 * @returns {string} The fraction string.
 */
export function numberToFraction(num: number): string {
    const tolerance = 1.0e-6;
    let previousNumerator = 1;
    let currentNumerator = Math.floor(num);
    let previousDenominator = 0;
    let currentDenominator = 1;
    let remaining = num - currentNumerator;

    while (Math.abs(num - currentNumerator / currentDenominator) > num * tolerance) {
        const tempNumerator = currentNumerator;
        const tempDenominator = currentDenominator;
        const quotient = Math.floor(1 / remaining);

        currentNumerator = quotient * currentNumerator + previousNumerator;
        previousNumerator = tempNumerator;
        currentDenominator = quotient * currentDenominator + previousDenominator;
        previousDenominator = tempDenominator;
        remaining = 1 / remaining - quotient;
    }

    return `${currentNumerator}/${currentDenominator}`;
}

/**
 * Converts a number of seconds to a time format.
 * @param {number} num - The number of seconds.
 * @returns {string} The time format (HH:MM:SS) of the number of seconds.
 *
 * @example
 * // Returns "1:01:01"
 * numberToTime(3661);
 */
export function numberToTime(num: number): string {
    const hours = Math.floor(num / 3600);
    const minutes = Math.floor((num % 3600) / 60);
    const seconds = num % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Converts a number to its ordinal suffix.
 * @param {number} num - The number to convert.
 * @returns {string} The ordinal suffix of the number.
 *
 * @example
 * // Returns "1st"
 * numberToOrdinalSuffix(1);
 */
export function numberToOrdinalSuffix(num: number): string {
    if (num === 0) return '0'; // No suffix for 0
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) {
        return num + 'st';
    }
    if (j === 2 && k !== 12) {
        return num + 'nd';
    }
    if (j === 3 && k !== 13) {
        return num + 'rd';
    }
    return num + 'th';
}

/**
 * Converts a number to its binary representation.
 * @param {number} num - The number to convert.
 * @returns {string} The binary representation of the number.
 *
 * @example
 * // Returns "10101"
 * numberToBinary(21);
 */
export function numberToBinary(num: number): string {
    return num.toString(2);
}

/**
 * Converts a number to its octal representation.
 * @param {number} num - The number to convert.
 * @returns {string} The octal representation of the number.
 *
 * @example
 * // Returns "25"
 * numberToOctal(21);
 */
export function numberToOctal(num: number): string {
    return num.toString(8);
}

/**
 * Converts a number to its hexadecimal representation.
 * @param {number} num - The number to convert.
 * @returns {string} The hexadecimal representation of the number.
 *
 * @example
 * // Returns "15"
 * numberToHexadecimal(21);
 */
export function numberToHexadecimal(num: number): string {
    return num.toString(16);
}
