const hideAlert = () => {
  const alert = document.querySelector('.alert-custom');
  if (alert) alert.remove();
};

export const showAlert = (type, message) => {
  hideAlert();
  const alert = document.createElement('div');
  alert.classList.add('alert-custom');
  document.querySelector('.wrapper-alert').appendChild(alert);
  alert.innerHTML = message;
  if (type === 'success') {
    alert.classList.add('alert-custom-success');
  } else {
    alert.classList.add('alert-custom-error');
  }
  setTimeout(() => {
    hideAlert();
  }, 3000);
};
