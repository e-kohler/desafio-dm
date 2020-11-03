import axios from 'axios'


export async function fetchRecipes (query, page) {
  const RECIPE_PUPPY_URL = process.env.RECIPE_PUPPY_URL
  try {
    const response = await axios.get(RECIPE_PUPPY_URL, {
      params: {
        i: query,
        p: page
      }
    })
    return response.data.results
  } catch(err) {
    return {
      status: 500,
      message: "Error while acessing RecipePuppy API"
    }
  }
}