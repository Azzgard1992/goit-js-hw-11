import Notiflix from 'notiflix';

const axios = require('axios');
const API_KEY = '25371989-2f16daf8090ee603b85b75fec';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImigesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImiges() {
    const options = {
      params: {
        key: API_KEY,
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: 40,
      },
    };
    try {
      const response = await axios.get(BASE_URL, options);
      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      }
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
