export function fetchGallery(name) {
  const url = 'https://pixabay.com/api/';
  const PERSONAL_KEY = '27539688-ef1c1b76d02735ef30548b858';

  return fetch(
    `${url}?key=${PERSONAL_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`,
  )
    .then(r => {
      if (r.ok) {
        return r.json();
      }
      throw new Error(r.status);
    });
}
