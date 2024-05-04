import { useState } from "react"
import axios from "axios"
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
export const useOxfordDictionary = () => {
    const options = {
        method: 'GET',
        url: 'https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-gb/ace',
        headers: {
          app_id: import.meta.env.REACT_APP_OXFORD_DICTIONARY_API_ID,
          app_key:import.meta.env.REACT_APP_OXFORD_DICTIONARY_API_KEY,
          Accept: 'application/json'
        }
      };
const oxfordDictionaryResponse = async () => {
    try {
        const { data } = await axios.request(options);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
}
}