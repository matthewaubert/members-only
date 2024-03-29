/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */

// function to confirm deletion
const confirmDelete = () =>
  confirm('Are you sure you want to delete this message?');

// attach event listener to message delete form submit buttons
document.addEventListener('DOMContentLoaded', () => {
  const deleteBtns = document.querySelectorAll('.delete-btn');
  if (deleteBtns.length) {
    console.log(deleteBtns);
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // Prevent form submission if confirmation is canceled
        if (!confirmDelete()) e.preventDefault();
      });
    });
  }
});
