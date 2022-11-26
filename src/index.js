import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import fetchCountries from './fetch-countries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  container: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  const searchCountry = e.target.value.trim();
  refs.list.innerHTML = '';
  refs.container.innerHTML = '';

  if (!searchCountry) {
    return;
  }

  fetchCountries(searchCountry)
    .then(country => {
      if (country.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }

      createMarkup(country);
    })
    .catch(err => Notify.failure('Oops, there is no country with this name'));
}

function createMarkup(list) {
  if (list.length === 1) {
    refs.container.innerHTML = list
      .map(country => {
        return `
        <img class="card__img" src="${country.flags.svg}" alt="${
          country.name
        }"/>
        <ul class="card">
  <li class="card__item">
    <span class="card__name">${country.name.official}</span>
  </li>
  <li class="card__item">
    <p class="card__desc">Capital:</p>
    <span class="card__value">${country.capital}</span>
  </li>
  <li class="card__item">
    <p class="card__desc">Population:</p>
    <span class="card__value">${country.population}</span>
  </li>
  <li class="card__item">
    <p class="card__desc">Languages:</p>
    <span class="card__value">${Object.values(country.languages)}</span>
  </li>
</ul>`;
      })
      .join('');
    return;
  }
  refs.list.innerHTML = list
    .map(country => {
      return `<li class="country__item">
        <img class="country__img" src="${country.flags.svg}" alt="${country.name}"></img>
        <h2 class="country__name">${country.name.official}</h2>
        </li>`;
    })
    .join('');
}
