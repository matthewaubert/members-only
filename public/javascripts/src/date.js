import { formatDate } from '../../../utils/util';

document.addEventListener('DOMContentLoaded', convertTimezone);

// convert timezone from server to client for correct display of message times
function convertTimezone() {
  const timestamps = document.querySelectorAll('.timestamp');

  if (timestamps.length) {
    timestamps.forEach((ts) => {
      // display adjusted & formatted time
      ts.innerText = formatDate(new Date(ts.dataset.date));
    });
  }
}
