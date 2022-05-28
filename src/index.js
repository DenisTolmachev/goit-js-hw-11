import './sass/main.scss';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

import galleryCard from './templates/galleryCard.hbs';
import { queryOptions } from './js/fetchGallery';
import { fetchGallery } from './js/fetchGallery';

const searchForm = document.querySelector('#search-form');
const cardsGallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {captionDelay: 250
});
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
  const totalHits = object.totalHits;
  const hitsArray = object.hits;
  if (hitsArray.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again',
    );
  } else {
    if (queryOptions.page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
    }
    
    cardsGallery.insertAdjacentHTML('beforeend', galleryCard(hitsArray));
    lightbox.refresh();
    queryOptions.page += 1;
  }
};

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
