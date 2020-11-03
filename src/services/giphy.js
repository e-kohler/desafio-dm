import axios from 'axios'

import { sanitizeString } from '../utils/utils.js'

export async function fetchGifs (recipes) {
  const GIPHY_URL = process.env.GIPHY_URL
  const GIPHY_API_KEY = process.env.GIPHY_API_KEY

  try {
    const promises = recipes.map(recipe => axios.get(`${GIPHY_URL}/gifs/search`, {
      params: {
        api_key: GIPHY_API_KEY,
        q: sanitizeString(recipe.title),
        limit: 1
      }
    }))
    const responses = await Promise.all(promises)
    const gifs = responses.map(response => response.data && response.data.data[0])
    return gifs
  } catch (err) {
    return {
      status: 500,
      message: "Error while acessing Giphy API" 
    }
  }
}