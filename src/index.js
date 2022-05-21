import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import galleryCard from './templates/galleryCard'
import { fetchGallery } from './js/fetchGallery';

const searchForm = document.querySelector('#search-form');
const cardsGallery = document.querySelector('.gallery')

function cardsMarkup(cards) {
   cardsGallery.insertAdjacentHTML('afterbegin', galleryCard(cards))
}

console.log(cardsMarkup);

function submitHandler(e) {
   e.preventDefault();
   const inputValue = e.currentTarget.elements.searchQuery.value
   console.log(inputValue);
   
   fetchGallery(inputValue)
   .then(cards => {
      cardsMarkup(cards)
   })
   .catch(() => Notiflix.Notify.failure(`Oops, there is no country with that name.`))
}

searchForm.addEventListener('submit', submitHandler);