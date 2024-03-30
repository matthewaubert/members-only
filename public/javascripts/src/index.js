import initNavMenu from './menu';
import addConfirmDelete from './confirm-delete';
import convertTimezone from './date';

document.addEventListener('DOMContentLoaded', () => {
  initNavMenu();
  addConfirmDelete();
  convertTimezone();
});
