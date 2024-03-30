/**
 * find and return error in given `errors` array with matching `path` value
 * @param {array} errors - `ValidationError` array
 * @param {string} path - (e.g. 'name')
 * @returns {object | undefined} error obj | undefined if not found
 */
exports.findError = (errors, path) => errors.find((err) => err.path === path);
