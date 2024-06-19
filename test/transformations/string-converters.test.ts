import * as converters from '../../src/transformations/string-converters';

describe('String Converters', () => {
    describe('trim', () => {
        test('should trim whitespace from the beginning and end of a string', () => {
            expect(converters.trim("  hello  ")).toBe("hello");
        });

        test('should handle empty string', () => {
            expect(converters.trim("")).toBe("");
        });

        test('should handle string with only whitespace', () => {
            expect(converters.trim("   ")).toBe("");
        });
    });

    describe('reverse', () => {
        test('should reverse a string', () => {
            expect(converters.reverse("hello world")).toBe("dlrow olleh");
        });

        test('should handle empty string', () => {
            expect(converters.reverse("")).toBe("");
        });
    });

    describe('abbreviate', () => {
        test('should abbreviate a string to a specified length, adding an ellipsis if truncated', () => {
            expect(converters.abbreviate("hello world", 8)).toBe("hello...");
        });

        test('should not abbreviate if string length is less than or equal to max length', () => {
            expect(converters.abbreviate("hello", 10)).toBe("hello");
        });

        test('should handle empty string', () => {
            expect(converters.abbreviate("", 5)).toBe("");
        });
    });

    describe('pad', () => {
        test('should pad a string with a specified character to a specified length', () => {
            expect(converters.pad("hello", 7)).toBe("  hello");
        });

        test('should pad a string on the right side if specified', () => {
            expect(converters.pad("hello", 7, ' ', true)).toBe("hello  ");
        });

        test('should handle empty string', () => {
            expect(converters.pad("", 5)).toBe("     ");
        });
    });

    describe('wordCount', () => {
        test('should count the number of words in a string', () => {
            expect(converters.wordCount("Hello world")).toBe(2);
        });

        test('should handle empty string', () => {
            expect(converters.wordCount("")).toBe(0);
        });
    });

    describe('slugify', () => {
        test('should convert a string into a slug', () => {
            expect(converters.slugify("Hello World")).toBe("hello-world");
        });

        test('should handle empty string', () => {
            expect(converters.slugify("")).toBe("");
        });
    });

    describe('pluralize', () => {
        test('should pluralize a word based on a count', () => {
            expect(converters.pluralize("apple", 1)).toBe("apple");
            expect(converters.pluralize("apple", 2)).toBe("apples");
        });

        test('should handle empty string', () => {
            expect(converters.pluralize("", 5)).toBe("");
        });
    });

    describe('humanize', () => {
        test('should convert an underscored or dashed string into a human-readable form', () => {
            expect(converters.humanize("hello_world")).toBe("Hello World");
        });

        test('should handle empty string', () => {
            expect(converters.humanize("")).toBe("");
        });
    });

    describe('removeAccents', () => {
        test('should remove accents from characters in a string', () => {
            expect(converters.removeAccents("héllö")).toBe("hello");
        });

        test('should handle empty string', () => {
            expect(converters.removeAccents("")).toBe("");
        });
    });

    describe('repeat', () => {
        test('should repeat a string a specified number of times', () => {
            expect(converters.repeat("hello", 3)).toBe("hellohellohello");
        });

        test('should handle empty string', () => {
            expect(converters.repeat("", 5)).toBe("");
        });
    });

    describe('mask', () => {
        test('should handle empty string', () => {
            expect(converters.mask("", "*", 0, 5)).toBe("");
        });
    });

    describe('levenshteinDistance', () => {
        test('should calculate the Levenshtein distance between two strings', () => {
            expect(converters.levenshteinDistance("kitten", "sitting")).toBe(3);
        });

        test('should handle empty strings', () => {
            expect(converters.levenshteinDistance("", "")).toBe(0);
        });
    });

    describe('replaceAll', () => {
        test('should replace all occurrences of a substring in a string', () => {
            expect(converters.replaceAll("hello hello", "hello", "hi")).toBe("hi hi");
        });

        test('should handle empty string', () => {
            expect(converters.replaceAll("", "a", "b")).toBe("");
        });
    });

    describe('countOccurrences', () => {
        test('should count the number of occurrences of a substring in a string', () => {
            expect(converters.countOccurrences("hello hello", "hello")).toBe(2);
        });

        test('should handle empty string', () => {
            expect(converters.countOccurrences("", "a")).toBe(0);
        });
    });

    describe('truncate', () => {
        test('should truncate a string to a specified length and add an ellipsis if truncated', () => {
            expect(converters.truncate("Hello world", 5)).toBe("He...");
        });
    });

    describe('capitalize', () => {
        test('should capitalize the first letter of a string', () => {
            expect(converters.capitalize("hello world")).toBe("Hello world");
        });

        test('should handle empty string', () => {
            expect(converters.capitalize("")).toBe("");
        });
    });

    describe('uncapitalize', () => {
        test('should uncapitalize the first letter of a string', () => {
            expect(converters.uncapitalize("Hello world")).toBe("hello world");
        });

        test('should handle empty string', () => {
            expect(converters.uncapitalize("")).toBe("");
        });
    });

    describe('removeHtmlTags', () => {
        test('should remove HTML tags from a string', () => {
            expect(converters.removeHtmlTags("<p>Hello <b>world</b></p>")).toBe("Hello world");
        });

        test('should handle empty string', () => {
            expect(converters.removeHtmlTags("")).toBe("");
        });
    });

    describe('trimStart', () => {
        test('should trim whitespace from the beginning of a string', () => {
            expect(converters.trimStart("  hello  ")).toBe("hello  ");
        });

        test('should handle empty string', () => {
            expect(converters.trimStart("")).toBe("");
        });
    });

    describe('trimEnd', () => {
        test('should trim whitespace from the end of a string', () => {
            expect(converters.trimEnd("  hello  ")).toBe("  hello");
        });

        test('should handle empty string', () => {
            expect(converters.trimEnd("")).toBe("");
        });
    });

    describe('padStart', () => {
        test('should pad the start of a string with a specified character to a specified length', () => {
            expect(converters.padStart("hello", 7)).toBe("  hello");
        });

        test('should handle empty string', () => {
            expect(converters.padStart("", 5)).toBe("     ");
        });
    });

    describe('padEnd', () => {
        test('should pad the end of a string with a specified character to a specified length', () => {
            expect(converters.padEnd("hello", 7)).toBe("hello  ");
        });

        test('should handle empty string', () => {
            expect(converters.padEnd("", 5)).toBe("     ");
        });
    });

    describe('reverseWords', () => {
        test('should reverse the order of words in a string', () => {
            expect(converters.reverseWords("hello world")).toBe("world hello");
        });

        test('should handle empty string', () => {
            expect(converters.reverseWords("")).toBe("");
        });
    });

    describe('shuffle', () => {
        test('should shuffle the characters in a string', () => {
            const str = "helloworld";
            expect(converters.shuffle(str)).not.toBe(str);
        });

        test('should handle empty string', () => {
            expect(converters.shuffle("")).toBe("");
        });
    });
});
