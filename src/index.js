import { Notify } from "notiflix"
import SlimSelect from 'slim-select'
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

const catsInfo = []
let catType = ""

fetchBreeds()
    .then(data => {
        data.map(({ id, description, name, temperament }) =>
            catsInfo.push({ id, description, name, temperament }))
        return createOptions(catsInfo)
    })
     .catch(err => errorMessage())

function createOptions(arr) {
    elements.select.classList.remove('dn')
    elements.loader.classList.remove('dn')
    const selectOptions = arr.map(({id, name} ) => `
        <option value="${id}">${name}</option>
        `)
        .join('')
    elements.select.innerHTML = selectOptions;
    fetchCatByBreed(elements.select.value)
        .then(data => createCard(elements.select.value, data[0].url))         
        .catch(err => errorMessage());
    elements.select.addEventListener('input', onInput)
}

function errorMessage() {
    return Notify.failure(`Oops! Something went wrong! Try reloading the page!`)
}

function onInput(event) {
    elements.card.classList.add('dn')
    elements.loader.classList.remove('dn')

    catType = event.target.value
    fetchCatByBreed(catType)
        .then(data => createCard(catType, data[0].url))         
        .catch(err => errorMessage());   
}

function createCard(id, url) {
    const { name, description, temperament } = catsInfo.find(el => id === el.id)
    elements.card.innerHTML = `
        <div class="img-div"><img src="${url}" alt="cat photo" width="100%">
        </div>
        <div class="description">
          <h3>${name}</h3>
          <p>${description}</p>
          <p><strong>Temperament: </strong>${temperament}</p>
        </div>
    `
    elements.loader.classList.add('dn')
    elements.card.classList.remove('dn')
}