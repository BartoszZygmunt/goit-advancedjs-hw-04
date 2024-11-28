// żadania api
import renderImages from './render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { lightbox } from '../main.js';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function fetchPixabayImages(query) {
  const API = 'https://pixabay.com/api/';
  const KEY = '21202878-7eed95eba93d8479640dfcfe2';
  const url = `${API}?key=${KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safeSearch=true`;
  NProgress.configure({
    showSpinner: true,
    trickleSpeed: 500,
  });
  NProgress.start();
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          title: 'Error',
          message: 'No images found. Try another query.',
          position: 'topCenter',
        });
        return;
      }
      //   wyczyść galerię
      const container = document.getElementById('images-container');
      container.innerHTML = '';
      //   renderuj obrazy
      renderImages(data.hits);
      //odśwież lightbox
      lightbox.refresh();
      NProgress.done();
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
}
