import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import cards from './templates/cards.hbs';
import { fetchImg } from './js/fetchImg';

const refs = {
  input: document.querySelector('.input'),
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

console.log(refs.form);

let pageNumber = 1;
let perPage = 40;
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

refs.gallery.addEventListener('click', e => {
  e.preventDefault();
});
refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onLoadMore);

async function onSubmit(e) {
  e.preventDefault();
  pageNumber = 1;
  refs.gallery.innerHTML = '';
  const value = refs.input.value;
  if (!value) {
    hideLoadBtn();
    return Notify.failure('Please enter any word!');
  }
  hideLoadBtn();
  const data = await fetchImg(value, pageNumber, perPage);
  const { hits, totalHits } = data;

  showLoadBtn();
  if (!totalHits) {
    hideLoadBtn();
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notify.success(`Hooray! We found ${totalHits} images.`);
    const items = createItemGallery(hits);
    refs.gallery.insertAdjacentHTML('beforeend', items);
  }

  if (totalHits > perPage) {
    showLoadBtn();
  }
  if (hits.length < perPage) {
    hideLoadBtn();
  }
  lightbox.refresh();
}

async function onLoadMore() {
  const value = refs.input.value;
  pageNumber += 1;
  hideLoadBtn();

  const data = await fetchImg(value, pageNumber, perPage);

  showLoadBtn();
  const { hits, totalHits } = data;
  const items = createItemGallery(hits);
  refs.gallery.insertAdjacentHTML('beforeend', items);
  scroll();
  if (hits.length < perPage) {
    hideLoadBtn();
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  lightbox.refresh();
}

function createItemGallery(items) {
  return items.map(cards).join('');
}

function showLoadBtn() {
  refs.loadBtn.classList.remove('is-hidden');
}

function hideLoadBtn() {
  refs.loadBtn.classList.add('is-hidden');
}

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
