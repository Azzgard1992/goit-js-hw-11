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
  imigesApiService.fetchImiges().then(data => {
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    if (data.totalHits < 40) {
      appendGalleryMurkup(data);
    } else {
      refs.button.classList.remove('is-hidden');
      appendGalleryMurkup(data);
    }
  });
}

function onLoadMore() {
  imigesApiService.fetchImiges().then(data => {
    if (data.hits.length < 40) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      refs.button.classList.add('is-hidden');
    }
    appendGalleryMurkup(data);
  });
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
