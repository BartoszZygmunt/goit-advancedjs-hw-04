import fetchPixabayImages from './js/pixabay-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
export let page = 1;
let textToSearch = '';

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

form.addEventListener('submit', event => {
  event.preventDefault();
  //  diagnostyka
  console.log('Obsługa zdarzenia submit została wywołana');
  // funkcja odczytu danych z api
  textToSearch = form.querySelector('input').value.trim();
  if (textToSearch === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please fill out the form field.',
      position: 'topCenter',
      timeout: 2000,
    });
    loadMoreButtonVisible(false);
    return;
  }
  // funkcja odczytu danych z api pixabay
  page = 1; //after new search reset page number
  fetchPixabayImages(textToSearch, page);
  //delete input value
  form.querySelector('input').value = '';
});

export function loadMoreButtonVisible(visible) {
  const button = document.querySelector('#load-more');
  if (visible === true) {
    button.classList.remove('hidden');
  } else {
    button.classList.add('hidden'); // Ukrywa przycisk
  }
}

// loadmore - button event listener
const loadMoreButton = document.getElementById('load-more');
loadMoreButton.addEventListener('click', () => {
  page += 1;
  fetchPixabayImages(form.querySelector('input').value.trim(), page);
});
