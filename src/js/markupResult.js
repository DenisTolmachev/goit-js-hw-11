import galleryCard from '../templates/galleryCard.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a', {captionDelay: 250
});

export const markupResult = (array, container) => {
    const markup =  galleryCard(array);
    container.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}