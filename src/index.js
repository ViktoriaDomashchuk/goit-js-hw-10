import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import fetchCountries from './fetch-countries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('country-list'),
  container: document.querySelector('country-info'),
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
        return `<ul class="info__list">
  <li class="info__item">
    <img src="${country.flags.svg}" alt="${
          country.name
        }" height="auto" width="35px"/>
    <span class="country__name">${country.name.official}</span>
  </li>
  <li class="info__item">
    <p class="country__header">Capital:</p>
    <span class="country__value">${country.capital}</span>
  </li>
  <li class="info__item">
    <p class="country__header">Population:</p>
    <span class="country__value">${country.population}</span>
  </li>
  <li class="info__item">
    <p class="country__header">Languages:</p>
    <span class="country__value">${Object.values(country.languages)}</span>
  </li>
</ul>`;
      })
      .join('');
    return;
  }
  refs.list.innerHTML = list
    .map(country => {
      return `<li class="item">
        <img class="container__img" src="${country.flags.svg}" alt="${country.name}" width="80"></img>
        <h2 class="header">${country.name.official}</h2>
        </li>`;
    })
    .join('');
}
