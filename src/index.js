import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const infoBreedContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

hideSelect();
hideError();

fetchBreeds()
  .then(response => {
    hideLoader();
    showSelect();
    return addfechedBreeds(response);
  })
  .catch(error => {
    showError();
    hideLoader();
  });

function addfechedBreeds(breeds) {
  selectEl.insertAdjacentHTML(
    'beforeend',
    breeds
      .map(breed => `<option value="${breed[0]}">${breed[1]}</option>`)
      .join('')
  );
}

selectEl.addEventListener('change', onChangeClick);

function onChangeClick(event) {
  const changedBreed = event.currentTarget.value;
  hideError();
  showLoader();

  infoBreedContainer.innerHTML = '';

  fetchCatByBreed(changedBreed)
    .then(response => {
      hideLoader();

      paintFetchedBreedMarkup(response);
    })
    .catch(error => {
      showError();
      hideLoader();
    });
}

function paintFetchedBreedMarkup(fetchedCatInfo) {
  infoBreedContainer.innerHTML = `<img src="${fetchedCatInfo.photoUrl}" width="700px" alt="${fetchedCatInfo.name}" class="cat_photo"/>
    <div class="descr_container">
    <h1 class="cat_name">${fetchedCatInfo.name}</h1>
    <p class="cat_descr">${fetchedCatInfo.description}</p>
    <p class="cat_temperament"><b>Temperament:</b> ${fetchedCatInfo.temperament}</p>
    </div>`;
}

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

function showError() {
  error.classList.remove('is-hidden');
}

function hideError() {
  error.classList.add('is-hidden');
}

function showSelect() {
  selectEl.classList.remove('is-hidden');
}

function hideSelect() {
  selectEl.classList.add('is-hidden');
}
