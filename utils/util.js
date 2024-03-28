const { formatRelative } = require('date-fns'); // https://date-fns.org/v3.6.0/docs/formatRelative

/**
 * find and return error in given `errors` array with matching `path` value
 * @param {array} errors - `ValidationError` array
 * @param {string} path - (e.g. 'name')
 * @returns {object | undefined} error obj | undefined if not found
 */
exports.findError = (errors, path) => errors.find((err) => err.path === path);

/**
 * format given date (Date obj, number, or string)
 * @param {DateType | number | string} date - The date to format (e.g. `new Date()` | '2024-03-28T16:39:06.059Z')
 * @returns {string} The date in words (e.g. 'Today at 12:02 PM')
 */
exports.formatDate = (date) => {
  const newDate = formatRelative(date, new Date());
  return newDate[0].toUpperCase() + newDate.slice(1);
};
