import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import router from './router.js'

const app = express()

app.use(express.json())
app.use(router)

app.listen(3333, () => {
  console.log('Server running on port 3333')
})

export default app