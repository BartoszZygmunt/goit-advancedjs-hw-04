// renderowanie elementów na stronie

export default function renderImages(images) {
  const container = document.getElementById('images-container');
  images.forEach(image => {
    console.log(image);

    const a = document.createElement('a');
    a.href = image.largeImageURL;
    a.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags || 'Image';
    img.classList.add('gallery-image');
    a.appendChild(img);

    // dodaj do kontenera
    container.appendChild(a);
    //lightbox.refresh();
  });

  //   return container;
}
