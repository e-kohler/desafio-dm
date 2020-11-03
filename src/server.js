import express from 'express'
import dotenv from 'dotenv'
import startRoutes from './routes/router.js'
dotenv.config()

const app = express()

startRoutes(app)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

export default app
