import axios from 'axios';

const url = 'https://pixabay.com/api/';
const PERSONAL_KEY = '27539688-ef1c1b76d02735ef30548b858';

export const fetchGallery = async value =>
  await axios
    .get(
      `${url}?key=${PERSONAL_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20`,
    )
    .catch(e => console.error(e));
