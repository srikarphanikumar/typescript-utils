import {
    toCamelCase,
    toSnakeCase,
    toKebabCase,
    toTitleCase,
    toConstantCase,
    toSwapCase,
    toSentenceCase,
    toUpperCase,
    toLowerCase,
    toPascalCase,
    toCamelCaseLower,
    toStartCase,
    toDotCase,
    toPathCase
} from '../../src/transformations/case-converters';

describe('caseConverters', () => {
    it('should convert string to camel case', () => {
        const input = 'hello world';
        const output = toCamelCase(input);
        expect(output).toBe('helloWorld');
    });

    it('should convert string to snake case', () => {
        const input = 'helloWorld';
        const output = toSnakeCase(input);
        expect(output).toBe('hello_world');
    });

    it('should convert string to kebab case', () => {
        const input = 'helloWorld';
        const output = toKebabCase(input);
        expect(output).toBe('hello-world');
    });

    it('should convert string to title case', () => {
        const input = 'hello world';
        const output = toTitleCase(input);
        expect(output).toBe('Hello World');
    });

    it('should convert string to constant case', () => {
        const input = 'hello world';
        const output = toConstantCase(input);
        expect(output).toBe('HELLO_WORLD');
    });

    it('should convert string to swap case', () => {
        const input = 'Hello World';
        const output = toSwapCase(input);
        expect(output).toBe('hELLO wORLD');
    });

    it('should convert string to sentence case', () => {
        const input = 'hello world';
        const output = toSentenceCase(input);
        expect(output).toBe('Hello world');
    });

    it('should convert string to upper case', () => {
        const input = 'hello world';
        const output = toUpperCase(input);
        expect(output).toBe('HELLO WORLD');
    });

    it('should convert string to lower case', () => {
        const input = 'HELLO WORLD';
        const output = toLowerCase(input);
        expect(output).toBe('hello world');
    });

    it('should convert string to pascal case', () => {
        const input = 'hello world';
        const output = toPascalCase(input);
        expect(output).toBe('HelloWorld');
    });

    it('should convert string to camel case with first letter lowercase', () => {
        const input = 'Hello World';
        const output = toCamelCaseLower(input);
        expect(output).toBe('helloWorld');
    });

    it('should convert string to start case', () => {
        const input = 'hello world';
        const output = toStartCase(input);
        expect(output).toBe('Hello World');
    });

    it('should convert string to dot case', () => {
        const input = 'hello world';
        const output = toDotCase(input);
        expect(output).toBe('hello.world');
    });

    it('should convert string to path case', () => {
        const input = 'hello world';
        const output = toPathCase(input);
        expect(output).toBe('hello/world');
    });
});
