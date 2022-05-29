import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25512826-4fc03a8129b56e35440cc764c';

export const queryOptions = {
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
  page: 1,
};

export const fetchGallery = async options => {
  const url = `${BASE_URL}?key=${API_KEY}`;
  try {
    const result = await axios.get(url, { options });
    return result;
  } catch {
    Notiflix.Notify.failure('Sorry, its data error');
  }
};
