import { showAlert } from './alerts.js';

// selecting dom elements
const form = document.querySelector('.signup-form');

form.addEventListener('submit', async (e) => {
  //  preventing default submitting action
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await axios({
      method: 'POST',
      url: '/signup',
      data: {
        name,
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signup Success');
      setTimeout(() => {
        location.assign('/signin');
      }, 2500);
    } else {
      showAlert('error', 'Duplicate entries');
    }
    console.log(res);
  } catch (error) {
    console.log(error);
    showAlert('error', 'duplicate entries');
  }
});
