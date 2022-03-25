import { showAlert } from './alerts.js';

// selecting dom elements
const form = document.querySelector('.signin-form');
form.addEventListener('submit', async (e) => {
  //  preventing default submitting action
  e.preventDefault();

  const username = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await axios({
      method: 'POST',
      url: '/signin',
      data: {
        username,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Login Success');
      setTimeout(() => {
        location.assign('/');
      }, 2500);
    } else {
      showAlert('error', 'Invalid email or Password');
    }
  } catch (error) {
    showAlert('error', error);
  }
});
