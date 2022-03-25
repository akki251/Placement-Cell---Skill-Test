import { showAlert } from './alerts.js';

const csvAlert = document.querySelector('body').dataset.alert;

if (csvAlert) {
  showAlert('success', 'CSV downloaded success');
}
