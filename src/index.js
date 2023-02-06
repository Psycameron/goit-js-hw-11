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
  spinner: document.querySelector('.preloader'),
  scrollBtn: document.querySelector('#scroll-top'),
};

let pageNumber = 1;
let perPage = 40;
let lightbox = new SimpleLightbox('.gallery a');

if (refs.input.value === '') {
  spinnerOff();
}
