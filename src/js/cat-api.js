import axios from "axios"

axios.defaults.headers.common["x-api-key"] = "live_m4ObvQP77IXKCEdixPqyozoa06wskRX7OqBtOStle7SJUKn5zMLTkNv0VBmF85bt";

const API_KEY = 'live_m4ObvQP77IXKCEdixPqyozoa06wskRX7OqBtOStle7SJUKn5zMLTkNv0VBmF85bt';
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';


function fetchBreeds() {
    return fetch(BASE_URL)        
        .then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }
                return resp.json()
            })
}


function fetchCatByBreed(breedId = "abys") {
    const CAT_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    
    return fetch(CAT_URL)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }            
            return resp.json()
        })
}



export { fetchBreeds, fetchCatByBreed }