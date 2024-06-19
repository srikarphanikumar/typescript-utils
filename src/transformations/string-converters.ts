/**
 * Trims whitespace from the beginning and end of a string.
 * @param {string} str - The input string to trim.
 * @returns {string} The trimmed string.
 *
 * @example
 * // Returns "hello"
 * trim("  hello  ");
 */
export function trim(str: string): string {
    return str.trim();
}

/**
 * Reverses a string.
 * @param {string} str - The input string to reverse.
 * @returns {string} The reversed string.
 *
 * @example
 * // Returns "dlrow olleh"
 * reverse("hello world");
 */
export function reverse(str: string): string {
    return str.split('').reverse().join('');
}

/**
 * Abbreviates a string to a specified length, adding an ellipsis if truncated.
 * @param {string} str - The input string to abbreviate.
 * @param {number} maxLength - The maximum length of the abbreviated string.
 * @returns {string} The abbreviated string.
 *
 * @example
 * // Returns "hello..."
 * abbreviate("hello world", 8);
 */
export function abbreviate(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.slice(0, maxLength - 3) + '...';
    }
}

/**
 * Pads a string with a specified character to a specified length.
 * @param {string} str - The input string to pad.
 * @param {number} length - The length to pad the string to.
 * @param {string} char - The character to use for padding (default is a space).
 * @param {boolean} right - Whether to pad on the right side (default is false, pads on the left side).
 * @returns {string} The padded string.
 *
 * @example
 * // Returns "  hello"
 * pad("hello", 7);
 *
 * @example
 * // Returns "hello  "
 * pad("hello", 7, ' ', true);
 */
export function pad(str: string, length: number, char: string = ' ', right: boolean = false): string {
    const padLength = length - str.length;
    if (padLength <= 0) {
        return str;
    }

    const padding = char.repeat(padLength);
    return right ? str + padding : padding + str;
}

/**
 * Counts the number of words in a string.
 * @param {string} str - The input string to count words in.
 * @returns {number} The number of words in the string.
 *
 * @example
 * // Returns 2
 * wordCount("Hello world");
 */
export function wordCount(str: string): number {
    return str.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Converts a string into a slug (lowercase, hyphen-separated words).
 * @param {string} str - The input string to slugify.
 * @returns {string} The slugified string.
 *
 * @example
 * // Returns "hello-world"
 * slugify("Hello World");
 */
export function slugify(str: string): string {
    return str.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Pluralizes a word based on a count.
 * @param {string} singular - The singular form of the word.
 * @param {number} count - The count to determine pluralization.
 * @param {string} plural - The optional plural form of the word (default is adding 's').
 * @returns {string} The pluralized form of the word.
 *
 * @example
 * // Returns "apple"
 * pluralize("apple", 1);
 *
 * @example
 * // Returns "apples"
 * pluralize("apple", 2);
 */
export function pluralize(singular: string, count: number, plural: string = `${singular}s`): string {
    if (!singular?.length) return '';
    return count === 1 ? singular : plural;
}

/**
 * Converts an underscored or dashed string into a human-readable form.
 * @param {string} str - The input string to humanize.
 * @returns {string} The humanized string.
 *
 * @example
 * // Returns "Hello world"
 * humanize("hello_world");
 */
export function humanize(str: string): string {
    return str.replace(/[_-]/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * Removes accents from characters in a string.
 * @param {string} str - The input string to remove accents from.
 * @returns {string} The string with accents removed.
 *
 * @example
 * // Returns "hello"
 * removeAccents("héllö");
 */
export function removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Repeats a string a specified number of times.
 * @param {string} str - The input string to repeat.
 * @param {number} times - The number of times to repeat the string.
 * @returns {string} The repeated string.
 *
 * @example
 * // Returns "hellohellohello"
 * repeat("hello", 3);
 */
export function repeat(str: string, times: number): string {
    return str.repeat(times);
}

/**
 * Masks characters in a string with a specified mask character.
 * @param {string} str - The input string to mask.
 * @param {string} maskChar - The character to use for masking (default is '*').
 * @param {number} start - The starting index to apply the mask (default is 0).
 * @param {number} end - The ending index to apply the mask (default is end of string).
 * @returns {string} The masked string.
 *
 * @example
 * // Returns "********4567"
 * mask("1234567890", "*", 0, 7);
 */
export function mask(str: string, maskChar: string = '*', start: number = 0, end: number = str.length): string {
    if (start < 0) {
        start = 0;
    }
    if (end > str.length) {
        end = str.length;
    }

    const prefix = str.substring(0, start);
    const masked = maskChar.repeat(end - start);
    const suffix = str.substring(end);

    return prefix + masked + suffix;
}

/**
 * Calculates the Levenshtein distance between two strings.
 * @param {string} a - The first string.
 * @param {string} b - The second string.
 * @returns {number} The Levenshtein distance between the two strings.
 *
 * @example
 * // Returns 3
 * levenshteinDistance("kitten", "sitting");
 */
export function levenshteinDistance(a: string, b: string): number {
    const dp: number[][] = [];

    for (let i = 0; i <= a.length; i++) {
        dp[i] = [];
        for (let j = 0; j <= b.length; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j - 1] + (a.charAt(i - 1) !== b.charAt(j - 1) ? 1 : 0),
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1
                );
            }
        }
    }

    return dp[a.length][b.length];
}

/**
 * Replaces all occurrences of a substring in a string.
 * @param {string} str - The input string to perform replacements on.
 * @param {string} search - The substring to search for.
 * @param {string} replace - The replacement substring.
 * @returns {string} The string with all occurrences of the substring replaced.
 *
 * @example
 * // Returns "hello world"
 * replaceAll("hello hello", "hello", "hi");
 */
export function replaceAll(str: string, search: string, replace: string): string {
    return str.split(search).join(replace);
}

/**
 * Counts the number of occurrences of a substring in a string.
 * @param {string} str - The input string to search in.
 * @param {string} sub - The substring to search for.
 * @returns {number} The number of occurrences of the substring in the string.
 *
 * @example
 * // Returns 2
 * countOccurrences("hello hello", "hello");
 */
export function countOccurrences(str: string, sub: string): number {
    return str.split(sub).length - 1;
}

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated.
 * @param {string} str - The input string to truncate.
 * @param {number} maxLength - The maximum length of the truncated string.
 * @returns {string} The truncated string.
 *
 * @example
 * // Returns "Hello..."
 * truncate("Hello world", 5);
 */
export function truncate(str: string, maxLength: number): string {
    return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string to capitalize.
 * @returns {string} The capitalized string.
 *
 * @example
 * // Returns "Hello world"
 * capitalize("hello world");
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Uncapitalizes the first letter of a string.
 * @param {string} str - The input string to uncapitalize.
 * @returns {string} The uncapitalized string.
 *
 * @example
 * // Returns "hello world"
 * uncapitalize("Hello world");
 */
export function uncapitalize(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Removes HTML tags from a string.
 * @param {string} str - The input string to remove HTML tags from.
 * @returns {string} The string with HTML tags removed.
 *
 * @example
 * // Returns "Hello world"
 * removeHtmlTags("<p>Hello <b>world</b></p>");
 */
export function removeHtmlTags(str: string): string {
    return str.replace(/<[^>]*>/g, '');
}

/**
 * Trims whitespace from the beginning of a string.
 * @param {string} str - The input string to trim.
 * @returns {string} The string with whitespace trimmed from the beginning.
 *
 * @example
 * // Returns "hello  "
 * trimStart("  hello  ");
 */
export function trimStart(str: string): string {
    return str.replace(/^\s+/, '');
}

/**
 * Trims whitespace from the end of a string.
 * @param {string} str - The input string to trim.
 * @returns {string} The string with whitespace trimmed from the end.
 *
 * @example
 * // Returns "  hello"
 * trimEnd("  hello  ");
 */
export function trimEnd(str: string): string {
    return str.replace(/\s+$/, '');
}
/**
 * Pads the start of a string with a specified character to a specified length.
 * @param {string} str - The input string to pad.
 * @param {number} length - The length to pad the string to.
 * @param {string} char - The character to use for padding (default is a space).
 * @returns {string} The padded string.
 *
 * @example
 * // Returns "  hello"
 * padStart("hello", 7);
 */
export function padStart(str: string, length: number, char: string = ' '): string {
    return str.padStart(length, char);
}

/**
 * Pads the end of a string with a specified character to a specified length.
 * @param {string} str - The input string to pad.
 * @param {number} length - The length to pad the string to.
 * @param {string} char - The character to use for padding (default is a space).
 * @returns {string} The padded string.
 *
 * @example
 * // Returns "hello  "
 * padEnd("hello", 7);
 */
export function padEnd(str: string, length: number, char: string = ' '): string {
    return str.padEnd(length, char);
}

/**
 * Reverses the order of words in a string.
 * @param {string} str - The input string to reverse words in.
 * @returns {string} The string with words reversed.
 *
 * @example
 * // Returns "world hello"
 * reverseWords("hello world");
 */
export function reverseWords(str: string): string {
    return str.split(/\s+/).reverse().join(' ');
}

/**
 * Shuffles the characters in a string.
 * @param {string} str - The input string to shuffle.
 * @returns {string} The shuffled string.
 *
 * @example
 * // Returns "lwolelhrd"
 * shuffle("helloworld");
 */
export function shuffle(str: string): string {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}
