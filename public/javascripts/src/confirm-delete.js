/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */

// function to confirm deletion
const confirmDelete = () =>
  confirm('Are you sure you want to delete this message?');

// attach event listener to message delete form submit buttons to confirm deletion
export default function addConfirmDelete() {
  const deleteBtns = document.querySelectorAll('.delete-btn');
  if (deleteBtns.length) {
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // Prevent form submission if confirmation is canceled
        if (!confirmDelete()) e.preventDefault();
      });
    });
  }
}
