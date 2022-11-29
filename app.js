import morgan from 'morgan'
import cors from 'cors'
import express from 'express'
import api from './src/api.js'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)
app.use(morgan('combined'))

app.use(express.json())

app.use('/v1', api)

export default app
