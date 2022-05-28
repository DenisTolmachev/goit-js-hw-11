import './sass/main.scss';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import sal from 'sal.js';

import galleryCard from './templates/galleryCard.hbs';
import { queryOptions } from './js/fetchGallery';
import { fetchGallery } from './js/fetchGallery';

const searchForm = document.querySelector('#search-form');
const cardsGallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: '250ms' });

//const sentinal = document.querySelector('.sentinal');
// const options = {
//   rootMargin: '200px',
// };
// const observer = new IntersectionObserver(onEntry, options);

const submitHandler = e => {
  //observer.disconnect();
  e.preventDefault();
  queryOptions.q = '';
  queryOptions.page = 1;
  cardsGallery.innerHTML = '';

  if (e.target.elements.searchQuery.value === '') {
    Notify.info('Please, enter a word for search!');
  } else {
    queryOptions.q = e.target.elements.searchQuery.value;
    fetchGallery(queryOptions).then(result => {
      createGallery(result.data);
    });
  }
};

const createGallery = object => {
  if (object.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again',
    );
  } else {
    if (queryOptions.page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${object.totalHits} images`);
    }

    cardsGallery.insertAdjacentHTML('beforeend', galleryCard(object.hits));
    lightbox.refresh();
    queryOptions.page += 1;
  }
};

cardsGallery.addEventListener('sal:in', ({ detail }) => {
  console.log('entering', detail.target);
});

// function onEntry(entries) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       fetchGallery(queryOptions).then(result => {
//         createGallery(result.data);
//       });
//     }
//   });
// }

searchForm.addEventListener('submit', submitHandler);
