import './sass/main.scss';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

import galleryCard from './templates/galleryCard.hbs';
import { queryOptions } from './js/fetchGallery';
import { fetchGallery } from './js/fetchGallery';

const searchForm = document.querySelector('#search-form');
const cardsGallery = document.querySelector('.gallery');
const watcher = document.querySelector('.watcher');

let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: '250ms' });
let observer = new IntersectionObserver(onEntry, { rootMargin: '200px' });

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
  // if (queryOptions.page >= object.totalHits / queryOptions.per_page) {
  //   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  // }
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

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchGallery(queryOptions).then(r => {
        createGallery(r.data);
      });
    }
  });
}

searchForm.addEventListener('submit', submitHandler);
// const infScroll = new InfiniteScroll('.gallery', {
//   responseType: 'text',
//   path() {
//     fetchGallery(queryOptions).then(result => {
//       createGallery(result.data);
//     });
//   }
// })
// infScroll.loadNextPage(queryOptions);
// console.log(infScroll.loadNextPage());
