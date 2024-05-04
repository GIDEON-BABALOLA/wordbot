import axios from "axios"
export const words = axios.create({
    baseURL : "https://api.dictionaryapi.dev/api/v2/entries/en/",
    withCredentials : false
})
export const oxfordDictionary = axios.create({
    baseURL : "	https://od-api-sandbox.oxforddictionaries.com/api/v2",
    withCredentials : true
})
export const merriamWebsterDictionary = axios.create({
    baseURL : "",
    withCredentials : false
})