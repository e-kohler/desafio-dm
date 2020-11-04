import axios from 'axios'

export async function fetchGifs (titles) {
  const GIPHY_URL = process.env.GIPHY_URL
  const GIPHY_API_KEY = process.env.GIPHY_API_KEY

  try {
    const promises = titles.map(title => axios.get(`${GIPHY_URL}/gifs/search`, {
      params: {
        api_key: GIPHY_API_KEY,
        q: title,
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