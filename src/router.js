import express from 'express'
import * as RecipeController from './controllers/RecipeController.js'

const router = express.Router()

router.get('/recipes', RecipeController.get)

export default router
