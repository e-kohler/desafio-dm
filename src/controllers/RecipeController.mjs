import axios from 'axios'

export async function get(req, res) {
  const query = req.query.i || ''
  const keywords = query.split(',')
  if (keywords.length > 3) {
    res.status(400)
    return res.send('Maximum number of ingredients is 3')
  }
  let recipes;
  let gifs;
  try {
    recipes = await fetchRecipes(query)
    gifs = await fetchGifs(recipes)
  } catch (err) {
    return res.json({
      status: 500,
      message: 'Falha ao capturar dados',
      err: err.message
    })
  }
  const formattedData = formatData(recipes, gifs)
  return res.json({
    keywords,
    recipes: formattedData
  })
}

async function fetchRecipes(query) {
  const response = await axios.get(process.env.RECIPE_PUPPY_URL, {
    params: {
      i: query
    }
  })
  return response.data.results
}

async function fetchGifs(recipes) {
  const promises = recipes.map(recipe => axios.get(`${process.env.GIPHY_URL}/gifs/search`, {
    params:{
      api_key: process.env.GIPHY_API_KEY,
      q: recipe.title,
      limit: 1
    }
  }))
  const responses = await Promise.all(promises)
  const gifs = responses.map(response => response.data.data[0])
  return gifs
}

function formatData(recipes, gifs) {
  return recipes.map((recipe, index) => {
    const gifUrl = gifs[index].url
    const ingredients = recipe.ingredients.split(',').sort()
    return {
      title: recipe.title,
      ingredients,
      link: recipe.href,
      gif: gifUrl
    }
  })
}