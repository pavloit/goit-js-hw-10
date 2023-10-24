import { Notify } from "notiflix"
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import './css/style.css'
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api"

const elements = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    card: document.querySelector('.cat-info')
}

elements.error.classList.add('dn')
elements.select.classList.add('dn')

fetchBreeds()
    .then(data => {
        createOptions(data)
    })
    .then(() => new SlimSelect({ select: '.breed-select' }))
    .catch(() => errorMessage())

function createOptions(arr) {
    elements.select.classList.remove('dn')
    elements.loader.classList.add('dn')
    elements.select.innerHTML = `<option data-placeholder="true">Виберіть котика</option>${arr.map(({ id, name }) => `
        <option value="${id}">${name}</option>
        `)
        .join('')}`
}

elements.select.addEventListener('change', onInput)


function errorMessage() {
    elements.loader.classList.add('dn')
    return Notify.failure(`Oops! Something went wrong! Try reloading the page!`,
        { timeout: 4000 })
}

function onInput(event) {
    elements.card.classList.add('dn')
    elements.loader.classList.remove('dn')

    fetchCatByBreed(event.target.value)
        .then(data => createCard(data[0]))         
        .catch(() => errorMessage());   
}

function createCard(data) {
  const { breeds, url } = data;
  const { name, temperament, description } = breeds[0];
    elements.card.innerHTML = `
        <div class="img-div"><img src="${url}" alt="cat photo" width="100%">
        </div>
        <div class="description">
          <h2>${name}</h2>
          <p>${description}</p>
          <p><strong>Temperament: </strong>${temperament}</p>
        </div>
    `
    elements.loader.classList.add('dn')
    elements.card.classList.remove('dn')
}