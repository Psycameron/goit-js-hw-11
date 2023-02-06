import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import cards from './templates/cards.hbs';
import { API_KEY, fetchImg, page } from './js/fetchImg';

const refs = {
  input: document.querySelector('.input'),
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

let pageNumber = 1;
let perPage = 40;
let lightbox = new SimpleLightbox('.gallery a');

refs.gallery.addEventListener('click', e => {
  e.preventDefault();
});
refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', loadMore);

async function onSubmit(e) {
  e.preventDefault();
  pageNumber = 1;
  refs.gallery.innerHTML = '';
  const value = refs.input.value;
  if (!value) {
    return Notify.failure('Please enter any word!');
  }
  onHideLoadBtn();
  const data = await fetchImg(value, pageNumber, perPage);
  const { hits, totalHits } = data;

  onShowLoadBtn();
  if (!totalHits) {
    onHideLoadBtn();
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notify.success(`Hooray! We found ${totalHits} images.`);
    const items = createItemGallery(hits);
    refs.gallery.insertAdjacentHTML('beforeend', items);
  }

  if (totalHits > perPage) {
    onShowLoadBtn();
  }
  if (hits.length < perPage) {
    onHideLoadBtn();
  }
  lightbox.refresh();
}

async function loadMore() {
  const value = refs.input.value;
  pageNumber += 1;
  onHideLoadBtn();

  const data = await fetchImg(value, pageNumber, perPage);

  onShowLoadBtn();
  const { hits, totalHits } = data;
  const items = createItemGallery(hits);
  refs.gallery.insertAdjacentHTML('beforeend', items);
  scroll();
  if (hits.length < perPage) {
    onHideLoadBtn();
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  lightbox.refresh();
}

function createItemGallery(items) {
  return items.map(cards).join('');
}

function onShowLoadBtn() {
  refs.loadBtn.classList.remove('is-hidden');
}

function onHideLoadBtn() {
  refs.loadBtn.classList.add('is-hidden');
}
