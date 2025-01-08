import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const registerForm = document.querySelector('.form');

registerForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const state = formData.get('state');
  const delay = parseInt(formData.get('delay'), 10);

  setTimeout(() => {
    return new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else if (state === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    })
      .then(message =>
        iziToast.success({
          title: 'Success',
          message,
          position: 'topRight',
        })
      )
      .catch(error =>
        iziToast.error({
          title: 'Error',
          message: error,
          position: 'topRight',
        })
      );
  }, delay);
  registerForm.reset();
}
