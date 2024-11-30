import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { lightbox } from '../main.js';
import { loadMoreButtonVisible } from '../main.js';
import renderImages from './render-functions.js';
import handleFetchError from './handle-errors.js';

export let totalImages = 0;

//configure NProgress options
NProgress.configure({
  showSpinner: true,
  trickleSpeed: 500,
});

//fetch images from Pixabay API with Axios
export default async function fetchPixabayImages(
  query,
  page,
  clearImages = true,
  totalShowed = false
) {
  const PIXABAY_API_URL = 'https://pixabay.com/api/';
  const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
  NProgress.start();

  try {
    const response = await axios.get(PIXABAY_API_URL, {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safeSearch: true,
        per_page: 15,
        page: page,
      },
    });

    const responseData = response.data;

    if (page == 1) {
      totalImages = responseData.totalHits;
    }

    if (responseData.total == 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Try another query.',
        position: 'topCenter',
      });
      return;
    }
    //if responseData.total > 0: clear images container and render images
    const imagesContainer = document.getElementById('images-container');
    // Check if images container exists
    if (!imagesContainer) {
      iziToast.error({
        title: 'Error',
        message: 'Images container not found in the document.',
        position: 'topCenter',
      });
      NProgress.done();
      return;
    }
    // Clear images container if clearImages is true
    if (clearImages) {
      imagesContainer.innerHTML = '';
    }
    // Render images
    renderImages(responseData.hits);
    scrollDown();
    if (totalShowed) {
      iziToast.info({
        title: 'Info',
        message: `Total images found: ${totalImages}`,
        position: 'topCenter',
        timeout: 5000,
      });
      loadMoreButtonVisible(false);
    }

    // Refresh SimpleLightbox - neccessary after adding new images
    lightbox.refresh();
  } catch (error) {
    handleFetchError(error); //function from handle-errors.js
  } finally {
    NProgress.done(); //finish NProgress visual effect - bar on top of the page
  }
}

const scrollDown = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
};
