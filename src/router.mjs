import express from 'express'
import * as RecipeController from './controllers/RecipeController.mjs'

const router = express.Router()

router.get('/', RecipeController.get)

export default router