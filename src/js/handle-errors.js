import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default function handleFetchError(error) {
  if (error.response) {
    // Błąd odpowiedzi serwera
    if (error.response.status === 401) {
      iziToast.error({
        title: 'Unauthorized',
        message: 'Invalid API key. Please check your credentials.',
        position: 'topCenter',
      });
    } else if (error.response.status === 500) {
      iziToast.error({
        title: 'Server Error',
        message: 'Server is currently unavailable. Please try again later.',
        position: 'topCenter',
      });
    } else {
      iziToast.error({
        title: 'Error',
        message: `An error occurred: ${error.response.statusText}`,
        position: 'topCenter',
      });
    }
  } else if (error.request) {
    // Brak odpowiedzi od serwera
    iziToast.error({
      title: 'Network Error',
      message:
        'No response from server. Please check your internet connection.',
      position: 'topCenter',
    });
  } else {
    // Błąd związany z ustawieniami zapytania
    iziToast.error({
      title: 'Error',
      message: `An error occurred while setting up the request: ${error.message}`,
      position: 'topCenter',
    });
  }
  console.error('Error fetching images:', error);
}
