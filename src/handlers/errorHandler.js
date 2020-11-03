export function handleError(res, error) {
  res.status(error.status)
  return res.json(error)
}