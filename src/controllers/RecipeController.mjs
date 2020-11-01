import axios from 'axios'

export async function get(req, res) {
  const query = req.query.i || ''
  const page = req.query.p || 1
  const keywords = query.split(',')
  if (keywords.length > 3) {
    res.status(400)
    return res.send('Maximum number of ingredients is 3')
  }
  let recipes;
  let gifs;
  try {
    recipes = await fetchRecipes(query, page)
    gifs = await fetchGifs(recipes)
  } catch (err) {
    res.status(err.response.status)
    return res.json({
      error: err.message,
      status: err.response.status,
      path: err.request.path
    })
  }
  const formattedData = formatData(recipes, gifs)
  return res.json({
    keywords,
    recipes: formattedData
  })
}

async function fetchRecipes(query, page) {
  const response = await axios.get(process.env.RECIPE_PUPPY_URL, {
    params: {
      i: query,
      p: page
    }
  })
  return response.data.results
}

async function fetchGifs(recipes) {
  const promises = recipes.map(recipe => axios.get(`${process.env.GIPHY_URL}/gifs/search`, {
    params:{
      api_key: process.env.GIPHY_API_KEY,
      q: recipe.title.trim().replace('\n', ''),
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
    const ingredients = recipe.ingredients.split(',').map(i => i.trim()).sort()
    return {
      title: recipe.title.trim().replace('\n', ''),
      ingredients,
      link: recipe.href,
      gif: gifUrl
    }
  })
}