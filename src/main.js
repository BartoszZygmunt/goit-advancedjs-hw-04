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
    clearGallery(); //czyszczenie galerii
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
  const buttonUp = document.querySelector('#to-top');
  if (visible === true) {
    button.classList.remove('hidden');
    buttonUp.classList.remove('hidden');
  } else {
    button.classList.add('hidden'); // Ukrywa przycisk
    buttonUp.classList.add('hidden'); // Ukrywa przycisk
  }
}

// loadmore - button event listener
const loadMoreButton = document.getElementById('load-more');
loadMoreButton.addEventListener('click', () => {
  page += 1;
  fetchPixabayImages(textToSearch, page, false);
});

const clearGallery = () => {
  console.log('clearing gallery111');
  const imagesContainer = document.getElementById('images-container');
  if (imagesContainer) {
    console.log('clearing gallery');
    imagesContainer.innerHTML = '';
  }
};

const scrollUp = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

// button id="to-top" listener
const buttonUp = document.getElementById('to-top');
buttonUp.addEventListener('click', () => {
  scrollUp();
});
