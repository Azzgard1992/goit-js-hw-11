import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImigesApiService from './JS/ImigesApiService';
import markupGallery from './JS/markupGallery';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('.load-more'),
};

const imigesApiService = new ImigesApiService();

refs.form.addEventListener('submit', onSubmit);
refs.button.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();

  clearGallery();
  imigesApiService.query = e.currentTarget.elements.searchQuery.value;

  if (imigesApiService.query === '' || imigesApiService.query === ' ') {
    return Notiflix.Notify.failure('Please enter something');
  }
  imigesApiService.resetPage();
  imigesApiService.fetchImiges().then(appendGalleryMurkup);
  refs.button.classList.remove('is-hidden');
}

function onLoadMore() {
  imigesApiService.fetchImiges().then(appendGalleryMurkup);
  refs.button.classList.add('is-hidden');
  refs.button.classList.remove('is-hidden');
}

function appendGalleryMurkup(data) {
  const gellary = data.hits.map(hit => markupGallery(hit)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', gellary);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
