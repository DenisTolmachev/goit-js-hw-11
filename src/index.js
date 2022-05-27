import './sass/main.scss';
import Notiflix from 'notiflix';
import galleryCard from './templates/galleryCard';
import PixApiService from './js/fetchGallery';

const pixApiService = new PixApiService();

const searchForm = document.querySelector('#search-form');
const cardsGallary = document.querySelector('.gallary');

searchForm.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();
  pixApiService.query = e.currentTarget.elements.searchQuery.value;
  console.log(pixApiService.query);
}

