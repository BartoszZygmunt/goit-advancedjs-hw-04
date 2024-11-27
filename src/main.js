import fetchPixabayImages from './js/pixabay-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Funkcja inicjująca SimpleLightbox
export let lightbox; //zasięg globalny

function initializeLightbox() {
  lightbox = new SimpleLightbox('#images-container a', {
    /* Opcje konfiguracyjne */
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
}
initializeLightbox();

const form = document.querySelector('form');
const submitButton = form.querySelector('button[type="submit"]');

submitButton.addEventListener('click', event => {
  event.preventDefault();
  // funkcja odczytu danych z api
  const input = form.querySelector('input').value.trim();
  if (!input) {
    alert('Please fill out the form field.');
    return;
  }
  // funkcja odczytu danych z api pixabay
  fetchPixabayImages(input);
});
