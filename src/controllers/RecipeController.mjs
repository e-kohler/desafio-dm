export async function get(req, res) {
  const ingredientsString = req.query.i || ''
  const ingredients = ingredientsString.split(',')
  return res.json({
    ingredients
  })
}