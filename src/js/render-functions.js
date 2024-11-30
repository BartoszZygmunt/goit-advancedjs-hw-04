// renderowanie elementów na stronie
import { loadMoreButtonVisible } from '../main.js';

export default function renderImages(images) {
  const container = document.getElementById('images-container');
  images.forEach(image => {
    // console.log(image);

    const a = document.createElement('a'); // <a></a>
    a.href = image.largeImageURL;
    a.classList.add('gallery-item');

    const div = document.createElement('div'); //<a> <div></div> </a>
    div.className = 'gallery-item-wrapper';
    a.appendChild(div);

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags || 'Image';
    img.classList.add('gallery-image');
    div.appendChild(img); // <a> <div> <img></img> </div> </a>

    const divInfo = document.createElement('div');
    divInfo.classList.add('gallery-item-info');

    // tworzę 4x div dla statystyk obrazu
    //tworzę tablicę z nazwami opisów
    const stats = ['Likes', 'Views', 'Comments', 'Downloads'];
    //tworzę tablicę z nazwami kluczy w obiekcie
    const keys = ['likes', 'views', 'comments', 'downloads'];

    //pętla, która tworzy 4x divy, w każdym div nazwa oraz wartość w <span>
    for (let i = 0; i < 4; i++) {
      const divStat = document.createElement('div');
      divStat.classList.add('gallery-item-info-element');

      const spanName = document.createElement('span');
      spanName.textContent = stats[i];
      spanName.classList.add('gallery-item-info-element-name');

      const spanValue = document.createElement('span');
      spanValue.textContent = image[keys[i]];
      spanValue.classList.add('gallery-item-info-element-value');

      divStat.appendChild(spanName);
      divStat.appendChild(spanValue);
      divInfo.appendChild(divStat);
    }

    div.appendChild(divInfo); // <a> <div> <img></img> <div> stats </div> </div> </a>

    // dodaj do kontenera
    container.appendChild(a);
  });

  //after rendering images show load more button
  loadMoreButtonVisible(true);
}
