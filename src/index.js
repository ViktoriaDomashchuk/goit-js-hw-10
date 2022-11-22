import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
console.log(Notify);
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
};
console.log(refs.input);
