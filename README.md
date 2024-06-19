# Package Name
@typescript/utils

## Description
Utility and helper functions for TypeScript.

## Author
Srikar Phani Kumar Marti

## Version
1.0.0

## License
MIT

## Repository
[GitHub Repository](https://github.com/srikarphanikumar/typescript-utils/)

## Installation
You can install the package using npm or yarn:

```sh
npm install @typescript/utils
```
or
```sh
yarn add @typescript/utils
```

## A few of the available utils

### Async Utils

\`\`\`markdown
| Function          | Description                                                                                           | Example                                                                       |
|-------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| retry             | Retries an asynchronous operation a specified number of times until it succeeds or reaches the maximum number of retries. | const result = await retry(() => fetchData(url), 3);                      |
| timeout           | Adds a timeout to an asynchronous operation, ensuring it completes within a specified time limit.   | const result = await timeout(() => fetchData(url), 5000);                |
| race              | Races multiple asynchronous operations and returns the result of the first one to complete.         | const result = await race([fetchData(url1), fetchData(url2)]);           |
| sequence          | Runs asynchronous operations sequentially, waiting for each to complete before starting the next one. | const result = await sequence([() => fetchData(url1), () => fetchData(url2)]); |
| parallel          | Runs multiple asynchronous operations in parallel and returns the results in the same order.        | const results = await parallel([() => fetchData(url1), () => fetchData(url2)]); |
\`\`\`

### Function Utils

\`\`\`markdown
| Function          | Description                                                                                           | Example                                                                       |
|-------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| debounce          | Delays the execution of a function until a specified amount of time has passed since the last call.  | const debouncedFunc = debounce(() => console.log('Hello'), 300);          |
| throttle          | Ensures a function is only called once within a specified time period.                              | const throttledFunc = throttle(() => console.log('Hello'), 300);          |
| memoize           | Caches the results of a function based on its inputs to improve performance.                        | const memoizedFunc = memoize(slowFunction);    
\`\`\`

### Guard Utils

\`\`\`markdown
| Function          | Description                                                                                           | Example                                                                       |
|-------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| isString          | Checks if a value is a string.                                                                       | const result = isString('Hello');                                            |
| isNumber          | Checks if a value is a number.                                                                       | const result = isNumber(123);                                                |
| isArray           | Checks if a value is an array.                                                                       | const result = isArray([1, 2, 3]);                                           |
| isObject          | Checks if a value is an object.                                                                      | const result = isObject({ key: 'value' });                                   |
| isFunction        | Checks if a value is a function.                                                                     | const result = isFunction(() => {});                                         |
\`\`\`

### Misc

\`\`\`markdown
| Function          | Description                                                                                           | Example                                                                       |
|-------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| isValidUrl              | Check if the URL is valid.                                                                       | const id = isValidUrl('https://google.com')                                                          |
| deepClone         | Creates a deep clone of an object.                                                                   | const clone = deepClone({ key: 'value' });                                   |
| merge             | Merges multiple objects into one.                                                                    | const merged = merge({ a: 1 }, { b: 2 });                                    |
| omit              | Omits specified keys from an object.                                                                 | const result = omit({ a: 1, b: 2 }, ['a']);                                  |
| pick              | Picks specified keys from an object.                                                                 | const result = pick({ a: 1, b: 2 }, ['a']);                                  |
\`\`\`

### Transformations

\`\`\`markdown
| Function          | Description                                                                                           | Example                                                                       |
|-------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| toCamelCase       | Converts a string to camel case.                                                                     | const result = toCamelCase('hello_world');                                   |
| toSnakeCase       | Converts a string to snake case.                                                                     | const result = toSnakeCase('helloWorld');                                    |
| toKebabCase       | Converts a string to kebab case.                                                                     | const result = toKebabCase('helloWorld');                                    |
| capitalize        | Capitalizes the first letter of a string.                                                            | const result = capitalize('hello');                                          |
| reverseString     | Reverses a string.                                                                                   | const result = reverseString('hello');                                       |
| convertDate       | Converts a date string to a specified format.                                                        | const result = convertDate('2023-01-01', 'MM/DD/YYYY');                      |
| addDays           | Adds a specified number of days to a date.                                                           | const result = addDays(new Date(), 5);                                       |
| subtractDays      | Subtracts a specified number of days from a date.                                                    | const result = subtractDays(new Date(), 5);                                  |
| formatDate        | Formats a date according to a specified format.                                                      | const result = formatDate(new Date(), 'YYYY-MM-DD');                         |
\`\`\`

## Contributing
Feel free to contribute to this project by opening issues or submitting pull requests. Please follow the existing code style and conventions.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
