import { formatRelative } from 'date-fns'; // https://date-fns.org/v3.6.0/docs/formatRelative

// get message timestamps from data attribute,
// convert to client timezone, format, and set as innerText
export default function convertTimezone() {
  const timestamps = document.querySelectorAll('.timestamp');

  if (timestamps.length) {
    timestamps.forEach((ts) => {
      // display adjusted & formatted time
      ts.innerText = formatDate(new Date(ts.dataset.date));
    });
  }
}

/**
 * format given date (Date obj, number, or string)
 * @param {DateType | number | string} date - The date to format (e.g. `new Date()` | '2024-03-28T16:39:06.059Z')
 * @returns {string} The date in words (e.g. 'Today at 12:02 PM')
 */
function formatDate(date) {
  const newDate = formatRelative(date, new Date());
  return newDate[0].toUpperCase() + newDate.slice(1);
}
