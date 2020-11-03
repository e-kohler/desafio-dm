import express from 'express'
import * as RecipeController from '../controllers/recipe.js'

const router = express.Router()

router.get('/', RecipeController.get)

export default router
