import { handleError } from '../handlers/errorHandler.js'

import { fetchRecipes } from '../services/recipePuppy.js'
import { fetchGifs } from '../services/giphy.js'

import { sanitizeString } from '../utils/utils.js'

export async function get (req, res) {
  const query = req.query.i || ''
  const page = req.query.p || 1
  const keywords = query.split(',')

  const inputIsInvalid = checkInvalidInput(keywords)
  if (inputIsInvalid) {
    return handleError(res, inputIsInvalid)
  }

  const recipesResponse = await fetchRecipes(query, page)
  if (recipesResponse.status === 500) {
    return handleError(res, recipesResponse)
  }
  const gifsResponse = await fetchGifs(recipesResponse)
  if (gifsResponse.status === 500) {
    return handleError(res, gifsResponse)
  }
  const formattedData = formatData(recipesResponse, gifsResponse)
  return res.json({
    keywords,
    recipes: formattedData
  })
}

export function formatData (recipes, gifs) {
  return recipes.map((recipe, index) => {
    const gifUrl = (gifs[index] && gifs[index].url) || ''
    const ingredients = recipe.ingredients.split(',').map(i => i.trim()).sort()
    return {
      title: sanitizeString(recipe.title),
      ingredients,
      link: recipe.href,
      gif: gifUrl
    }
  })
}

function checkInvalidInput(input) {
  if (input.length === 0) {
    return {
      status: 400,
      message: "You must enter at least 1 ingredient"
    }
  } else if (input.length > 3) {
    return {
      status: 400,
      message: "Maximum number of ingredients is 3"
    }
  } else {
    return false
  }
}