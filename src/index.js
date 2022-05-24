import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import galleryCard from './templates/galleryCard';
import { fetchGallery } from './js/fetchGallery';

const searchForm = document.querySelector('#search-form');
const cardsGallery = document.querySelector('.gallery');

const renderGallery = object => {
  //const totalHits = object.data.totalHits;
  const hits = object.data.hits;
  cardsGallery.insertAdjacentHTML('beforeend', galleryCard(hits));
};

const submitHandler = e => {
  e.preventDefault();
  const value = e.currentTarget.elements.searchQuery.value.trim();
  fetchGallery(value).then(r => renderGallery(r));
  console.log(fetchGallery(value));
};

searchForm.addEventListener('submit', submitHandler);
