import fetchPixabayImages from './js/pixabay-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
export let page = 1;

//sprawdzenie zmiennych środowiskowych
console.log(
  'Dostępne zmienne środowiskowe:',
  import.meta.env.VITE_PIXABAY_API_KEY
);

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
  fetchPixabayImages(input, page);
});

export function loadMoreButtonVisible(visible) {
  const button = document.querySelector('#load-more');
  if (visible === true) {
    button.classList.remove('hidden');
  } else {
    button.classList.add('hidden'); // Ukrywa przycisk
  }
}

//id="load-more" button event listener
const loadMoreButton = document.getElementById('load-more');
loadMoreButton.addEventListener('click', () => {
  page += 1;
  fetchPixabayImages(form.querySelector('input').value.trim(), page);
});
