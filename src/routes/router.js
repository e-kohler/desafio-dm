import express from 'express'
import recipeRouter from './recipe.js'

export default function startRoutes(app) {
  app.use(express.json())
  app.use('/recipes', recipeRouter)
}
