import { formatDate } from '../../../utils/util';

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
