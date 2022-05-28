import './sass/main.scss';
import Notiflix from 'notiflix';

import { imgParams } from './js/fetchGallery';
import { getImages } from './js/fetchGallery';
import { markupResult } from './js/markupResult';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const sentinal = document.querySelector('.sentinal');
const options = {
    rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);

const onFormSubmit = (evt) => {
    observer.disconnect();
    evt.preventDefault();
    imgParams.q = '';
    imgParams.page = 1;
    gallery.innerHTML = '';
    eventHandler(evt);
}

const eventHandler = (evt) => {
    if (evt.target.elements.searchQuery.value === '') {
        Notify.info('Please, enter a word for search!');
    } else {
        imgParams.q = evt.target.elements.searchQuery.value;
        getImages(imgParams).then((result) => {
            createGallery(result.data);
        });
    } 
}

const createGallery = (object) => {
    const totalHits = object.totalHits;
    const hitsArray = object.hits;
    if (hitsArray.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
    } else {
        if (imgParams.page === 1) {
          Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
            
        }
        markupResult(hitsArray, gallery);
        imgParams.page += 1;
    }
}

function onEntry(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            getImages(imgParams).then((result) => {
                createGallery(result.data);
            });
        }
    })
}

form.addEventListener('submit', onFormSubmit);