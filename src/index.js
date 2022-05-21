import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import galleryCard from './templates/galleryCard'
import { fetchGallery } from './js/fetchGallery';

const searchForm = document.querySelector('#search-form');

function inputHandler(e) {
   const inputValue = e.target.value;
   console.log(inputValue);
}

searchForm.addEventListener('input', inputHandler)


console.log(fetchGallery('cat'));
