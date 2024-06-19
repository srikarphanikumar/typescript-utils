type DateParts = {
    [key: string]: string;
    YYYY: string;
    MM: string;
    DD: string;
    HH: string;
    mm: string;
    ss: string;
};

/**
 * Converts a date string from one format to another using only the Date object in JavaScript.
 * @param {string} dateString - The input date string.
 * @param {string} inputFormat - The format of the input date string (e.g., 'YYYY-MM-DD').
 * @param {string} outputFormat - The desired output format for the date string (e.g., 'DD/MM/YYYY').
 * @returns {string} The date string converted to the output format.
 *
 * @example
 * // Returns "25/12/2022"
 * convertDateFormat("2022-12-25", "YYYY-MM-DD", "DD/MM/YYYY");
 */
export function convertDateFormat(dateString: string, inputFormat: string, outputFormat: string): string {
    const parts = dateString.split(/[\s:/-]/);
    const inputMap: DateParts = {
        YYYY: parts[0],
        MM: parts[1],
        DD: parts[2],
        HH: parts[3] || '00',
        mm: parts[4] || '00',
        ss: parts[5] || '00'
    };

    const outputParts = outputFormat.split(/[\s:/-]/);
    const outputDate = new Date();

    outputDate.setFullYear(+inputMap[outputParts[0]]);
    outputDate.setMonth(+inputMap[outputParts[1]] - 1);
    outputDate.setDate(+inputMap[outputParts[2]]);
    outputDate.setHours(+inputMap[outputParts[3]]);
    outputDate.setMinutes(+inputMap[outputParts[4]]);
    outputDate.setSeconds(+inputMap[outputParts[5]]);

    const padZero = (value: number) => (value < 10 ? '0' : '') + value;
    const getOutputValue = (part: string) => {
        switch (part) {
            case 'YYYY':
                return outputDate.getFullYear();
            case 'MM':
                return padZero(outputDate.getMonth() + 1);
            case 'DD':
                return padZero(outputDate.getDate());
            case 'HH':
                return padZero(outputDate.getHours());
            case 'mm':
                return padZero(outputDate.getMinutes());
            case 'ss':
                return padZero(outputDate.getSeconds());
            default:
                return part;
        }
    };

    return outputParts.map(getOutputValue).join(outputFormat.match(/[\s:/-]/)![0]);
}

/**
 * Gets the difference in days between two date strings.
 * @param {string} startDateString - The start date string.
 * @param {string} endDateString - The end date string.
 * @returns {number} The difference in days between the two dates.
 *
 * @example
 * // Returns 5
 * getDaysDifference("2022-12-20", "2022-12-25");
 */
export function getDaysDifference(startDateString: string, endDateString: string): number {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * Converts a date to a formatted string.
 * @param {Date} date - The input date.
 * @param {string} format - The desired output format for the date string.
 * @returns {string} The formatted date string.
 *
 * @example
 * // Returns "2022-06-01"
 * formatDate(new Date('2022-06-01'), 'YYYY-MM-DD');
 */
export function formatDate(date: Date, format: string): string {
    const dateParts: DateParts = {
        YYYY: date.getFullYear().toString(),
        MM: (date.getMonth() + 1).toString().padStart(2, '0'),
        DD: date.getDate().toString().padStart(2, '0'),
        HH: date.getHours().toString().padStart(2, '0'),
        mm: date.getMinutes().toString().padStart(2, '0'),
        ss: date.getSeconds().toString().padStart(2, '0'),
    };

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => dateParts[match as keyof DateParts]);
}

/**
 * Converts a string to a date object.
 * @param {string} dateString - The input date string.
 * @returns {Date} The parsed date object.
 *
 * @example
 * // Returns a Date object representing June 1, 2022
 * parseDate('2022-06-01');
 */
export function parseDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Gets the month name for a given date.
 * @param {Date} date - The input date.
 * @returns {string} The month name.
 *
 * @example
 * // Returns "June"
 * getMonthName(new Date('2022-06-01'));
 */
export function getMonthName(date: Date): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[date.getMonth()];
}

/**
 * Gets the day name for a given date.
 * @param {Date} date - The input date.
 * @returns {string} The day name.
 *
 * @example
 * // Returns "Wednesday"
 * getDayName(new Date('2022-06-01'));
 */
export function getDayName(date: Date): string {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[date.getDay()];
}

/**
 * Gets the number of days in a month for a given year and month.
 * @param {number} year - The year.
 * @param {number} month - The month (1-12).
 * @returns {number} The number of days in the month.
 *
 * @example
 * // Returns 30
 * getDaysInMonth(2022, 6);
 */
export function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
}

/**
 * Gets the timezone offset in minutes for a given date.
 * @param {Date} date - The input date.
 * @returns {number} The timezone offset in minutes.
 *
 * @example
 * // Returns -240 (Eastern Daylight Time)
 * getTimezoneOffset(new Date('2022-06-01'));
 */
export function getTimezoneOffset(date: Date): number {
    return date.getTimezoneOffset();
}

/**
 * Adds a specified number of days to a date.
 * @param {Date} date - The input date.
 * @param {number} days - The number of days to add.
 * @returns {Date} The new date.
 *
 * @example
 * // Returns a Date object representing June 6, 2022
 * addDays(new Date('2022-06-01'), 5);
 */
export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Adds a specified number of months to a date.
 * @param {Date} date - The input date.
 * @param {number} months - The number of months to add.
 * @returns {Date} The new date.
 *
 * @example
 * // Returns a Date object representing July 1, 2022
 * addMonths(new Date('2022-06-01'), 1);
 */
export function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

/**
 * Adds a specified number of years to a date.
 * @param {Date} date - The input date.
 * @param {number} years - The number of years to add.
 * @returns {Date} The new date.
 *
 * @example
 * // Returns a Date object representing June 1, 2023
 * addYears(new Date('2022-06-01'), 1);
 */
export function addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
}

/**
 * Calculates the age in years for a given birth date.
 * @param {Date} birthDate - The birth date.
 * @returns {number} The age in years.
 *
 * @example
 * // Returns 30
 * getAge(new Date('1992-06-01'));
 */
export function getAge(birthDate: Date): number {
    const today = new Date();
    const diff = today.getTime() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * Checks if a given year is a leap year.
 * @param {number} year - The year.
 * @returns {boolean} True if the year is a leap year, false otherwise.
 *
 * @example
 * // Returns true
 * isLeapYear(2024);
 */
export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Converts a duration in milliseconds to a human-readable format.
 * @param {number} duration - The duration in milliseconds.
 * @returns {string} The formatted duration string.
 *
 * @example
 * // Returns "1 day, 2 hours, 30 minutes, 15 seconds"
 * formatDuration(93721515);
 */
export function formatDuration(duration: number): string {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));

    const parts = [];
    if (days) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds) parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);

    return parts.join(', ');
}

/**
 * Gets the current date and time.
 * @returns {Date} The current date and time.
 *
 * @example
 * // Returns the current date and time
 * getCurrentDateTime();
 */
export function getCurrentDateTime(): Date {
    return new Date();
}

/**
 * Gets the start of the day for a given date.
 * @param {Date} date - The input date.
 * @returns {Date} The start of the day.
 *
 * @example
 * // Returns a Date object representing the start of June 1, 2022
 * getStartOfDay(new Date('2022-06-01T12:34:56'));
 */
export function getStartOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

/**
 * Gets the end of the day for a given date.
 * @param {Date} date - The input date.
 * @returns {Date} The end of the day.
 *
 * @example
 * // Returns a Date object representing the end of June 1, 2022
 * getEndOfDay(new Date('2022-06-01T12:34:56'));
 */
export function getEndOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
}

/**
 * Gets the start of the month for a given date.
 * @param {Date} date - The input date.
 * @returns {Date} The start of the month.
 *
 * @example
 * // Returns a Date object representing the start of June 1, 2022
 * getStartOfMonth(new Date('2022-06-15'));
 */
export function getStartOfMonth(date: Date): Date {
    const result = new Date(date);
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
}

/**
 * Gets the end of the month for a given date.
 * @param {Date} date - The input date.
 * @returns {Date} The end of the month.
 *
 * @example
 * // Returns a Date object representing the end of June 30, 2022
 * getEndOfMonth(new Date('2022-06-15'));
 */
export function getEndOfMonth(date: Date): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1, 0);
    result.setHours(23, 59, 59, 999);
    return result;
}

/**
 * Checks if two dates are on the same day.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {boolean} True if the dates are on the same day, false otherwise.
 *
 * @example
 * // Returns true
 * isSameDay(new Date('2022-06-01'), new Date('2022-06-01T12:34:56'));
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

/**
 * Checks if a date is in the future.
 * @param {Date} date - The input date.
 * @returns {boolean} True if the date is in the future, false otherwise.
 *
 * @example
 * // Returns true if the current date is June 2, 2022
 * isFutureDate(new Date('2022-06-03'));
 */
export function isFutureDate(date: Date): boolean {
    return date > new Date();
}

/**
 * Checks if a date is in the past.
 * @param {Date} date - The input date.
 * @returns {boolean} True if the date is in the past, false otherwise.
 *
 * @example
 * // Returns true if the current date is June 2, 2022
 * isPastDate(new Date('2022-06-01'));
 */
export function isPastDate(date: Date): boolean {
    return date < new Date();
}

/**
 * Calculates the difference in hours between two dates.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {number} The difference in hours.
 *
 * @example
 * // Returns 6
 * getDifferenceInHours(new Date('2022-06-01T12:00:00'), new Date('2022-06-01T18:00:00'));
 */
export function getDifferenceInHours(date1: Date, date2: Date): number {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.floor(diff / (1000 * 60 * 60));
}

/**
 * Calculates the difference in minutes between two dates.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {number} The difference in minutes.
 */
export function getDifferenceInMinutes(date1: Date, date2: Date): number {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.floor(diff / (1000 * 60));
}

/**
 * Calculates the difference in seconds between two dates.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {number} The difference in seconds.
 */
export function getDifferenceInSeconds(date1: Date, date2: Date): number {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.floor(diff / 1000);
}

/**
 * Compares two dates to determine their relative order.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {number} A negative value if date1 is before date2, 0 if they are the same, and a positive value if date1 is after date2.
 *
 * @example
 * // Returns -1
 * compareDates(new Date('2022-06-01'), new Date('2022-06-02'));
 */
export function compareDates(date1: Date, date2: Date): number {
    return date1.getTime() - date2.getTime();
}

/**
 * Calculates the weekday (e.g., Monday, Tuesday) for a given date.
 * @param {Date} date - The input date.
 * @returns {string} The weekday.
 *
 * @example
 * // Returns "Wednesday"
 * getWeekday(new Date('2022-06-01'));
 */
export function getWeekday(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

/**
 * Determines the quarter of the year for a given date.
 * @param {Date} date - The input date.
 * @returns {number} The quarter of the year (1-4).
 *
 * @example
 * // Returns 2
 * getQuarter(new Date('2022-06-01'));
 */
export function getQuarter(date: Date): number {
    return Math.ceil((date.getMonth() + 1) / 3);
}

/**
 * Determines the season (e.g., Spring, Summer) for a given date.
 * @param {Date} date - The input date.
 * @returns {string} The season.
 *
 * @example
 * // Returns "Spring"
 * getSeason(new Date('2022-03-21'));
 */
export function getSeason(date: Date): string {
    const month = date.getMonth() + 1;
    switch (month) {
        case 12:
        case 1:
        case 2:
            return 'Winter';
        case 3:
        case 4:
        case 5:
            return 'Spring';
        case 6:
        case 7:
        case 8:
            return 'Summer';
        case 9:
        case 10:
        case 11:
            return 'Fall';
        default:
            return '';
    }
}

/**
 * Determines the ISO week number for a given date.
 * @param {Date} date - The input date.
 * @returns {number} The ISO week number.
 *
 * @example
 * // Returns 1
 * getWeekNumber(new Date('2022-01-01'));
 */
export function getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((date.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
    return weekNumber;
}

/**
 * Generates a range of dates between two given dates.
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {Date[]} An array of dates.
 *
 * @example
 * // Returns [new Date('2022-06-01'), new Date('2022-06-02'), new Date('2022-06-03')]
 * generateDateRange(new Date('2022-06-01'), new Date('2022-06-03'));
 */
export function generateDateRange(startDate: Date, endDate: Date): Date[] {
    const dates = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

/**
 * Checks if a given date is during daylight saving time.
 * @param {Date} date - The input date.
 * @returns {boolean} True if the date is during daylight saving time, false otherwise.
 *
 * @example
 * // Returns true
 * isDaylightSavingTime(new Date('2022-06-01'));
 */
export function isDaylightSavingTime(date: Date): boolean {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    return date.getTimezoneOffset() < Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

/**
 * Converts the time of a given date to a different time zone.
 * @param {Date} date - The input date.
 * @param {string} targetTimezone - The target time zone (e.g., '-04:00' or '-0400').
 * @returns {Date} The converted date.
 */
export function convertTimezone(date: Date, targetTimezone: string): Date {
    let hourOffset, minuteOffset;

    if (targetTimezone.includes(':')) {
        [hourOffset, minuteOffset] = targetTimezone
            .split(':')
            .map(Number);
    } else {
        hourOffset = parseInt(targetTimezone.slice(0, 3), 10);
        minuteOffset = parseInt(targetTimezone.slice(3), 10);
    }

    const targetOffset = (hourOffset * 60 + minuteOffset) * 60000; // Convert to milliseconds
    const currentOffset = date.getTimezoneOffset() * 60000; // Convert to milliseconds
    const newDate = new Date(date.getTime() + (targetOffset - currentOffset));
    return newDate;
}

/**
 * Calculates the age of a person in months.
 * @param {Date} birthDate - The birth date.
 * @returns {number} The age in months.
 *
 * @example
 * // Returns 264
 * getAgeInMonths(new Date('2000-01-01'));
 */
export function getAgeInMonths(birthDate: Date): number {
    const today = new Date();
    let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth() + 1;
    months += today.getMonth() + 1;
    return months <= 0 ? 0 : months;
}

/**
 * Calculates the age of a person in days.
 * @param {Date} birthDate - The birth date.
 * @returns {number} The age in days.
 *
 * @example
 * // Returns 8175
 * getAgeInDays(new Date('2000-01-01'));
 */
export function getAgeInDays(birthDate: Date): number {
    const today = new Date();
    const diff = today.getTime() - birthDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}
