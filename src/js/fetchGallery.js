import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const PERSONAL_KEY = '27539688-ef1c1b76d02735ef30548b858';
export default class PixApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  async fetchGallery() {
    try {
      const params = new SearchParams({
        q: this.query,
        image_type: 'photo',
        per_page: 40,
        orientation: 'horizontal',
        page: this.page,
      });
      const url = `${BASE_URL}?${params.toString()}&key=${PERSONAL_KEY}`;
      const r = await axios.get(url);
      return r;
    } catch (error) {
      return error;
    }
  }
}
