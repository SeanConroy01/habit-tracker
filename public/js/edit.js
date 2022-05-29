const editBtn = document.querySelector('.toggle-edit');
const editVisible = localStorage.getItem('is-editing');

let edit = false;

if (editVisible === 'true') {
  document.body.classList.add('edit');
  edit = true;
}

editBtn.addEventListener('click', () => {
  document.body.classList.toggle('edit');
  edit = !edit;
  localStorage.setItem('is-editing', edit);
});
