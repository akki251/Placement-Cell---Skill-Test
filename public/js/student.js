import { showAlert } from './alerts.js';

// selecting dom elements
const form = document.querySelector('.student-form');
form.addEventListener('submit', async (e) => {
  //  preventing default submitting action
  e.preventDefault();


  // selecting input fields 
  const name = document.getElementById('name').value;
  const college = document.getElementById('college').value;
  const dsaScore = document.getElementById('dsaScore').value;
  const webScore = document.getElementById('webScore').value;
  const reactScore = document.getElementById('reactScore').value;


  // axios http request 
  try {
    const res = await axios({
      method: 'POST',
      url: '/student',
      data: {
        name,
        college,
        dsaScore,
        webScore,
        reactScore,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Student Created');
      setTimeout(() => {
        location.assign('/allstudents');
      }, 2500);
    } else {
      showAlert('error', 'duplicate entries');
    }
  } catch (error) {
    showAlert('error', error);
  }
});
