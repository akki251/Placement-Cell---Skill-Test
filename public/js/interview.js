// /// updating status of interview

import { showAlert } from './alerts.js';

// using event propagation to handle update form button
document.querySelector('.content').addEventListener('click', async (e) => {
  const target = e.target;

  if (target.classList.contains('submit')) {
    e.preventDefault();
    // selecting form using parent element 
    const form = target.parentElement;


    const status = form.querySelector('#status').value;
    const id = form.querySelector('#id').value;

    target.innerHTML = 'updating...';

    // axios http request 
    try {
      const res = await axios({
        method: 'PATCH',
        url: `/interview/${id}`,
        data: {
          status,
        },
      });

      if (res.data.status === 'success') {
        showAlert('success', 'Interview status Updated');
        target.innerHTML = 'UPDATED';
      } else {
        showAlert('error', 'Invalid value');
      }
    } catch (error) {
      showAlert('error', error);
      target.innerHTML = 'FAILED';
    }
  }
});

// creating interview with form

const interviewForm = document.querySelector('.interview-form');

interviewForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const companyName = interviewForm.querySelector('#companyName').value;
  const date = interviewForm.querySelector('#date').value;
  const registeredStudent =
    interviewForm.querySelector('#registeredStudent').value;

  try {
    const res = await axios({
      method: 'POST',
      url: '/interview',
      data: {
        companyName,
        date,
        registeredStudent,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Interview created !');
    }
  } catch (error) {
    showAlert('error', error);
  }
});
