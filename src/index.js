import './sass/main.scss';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

import galleryCard from './templates/galleryCard.hbs';
import { queryOptions, fetchGallery} from './js/fetchGallery';

const searchForm = document.querySelector('#search-form');
const cardsGallery = document.querySelector('.gallery');
const watcher = document.querySelector('.watcher');

let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: '250ms' });

let observer = new IntersectionObserver(onEntry, { rootMargin: '200px' });

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchGallery(queryOptions).then(r => {
        createGallery(r.data);
      });
    }
  });
}

const submitHandler = e => {
  observer.disconnect();
  e.preventDefault();
  queryOptions.q = '';
  queryOptions.page = 1;
  cardsGallery.innerHTML = '';

  if (e.target.elements.searchQuery.value === '') {
    Notiflix.Notify.info('Please enter a search keyword!');
  } else {
    queryOptions.q = e.target.elements.searchQuery.value;
    fetchGallery(queryOptions).then(r => {
      createGallery(r.data);
      observer.observe(watcher);
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

searchForm.addEventListener('submit', submitHandler);