import http from 'http'
import dotenv from 'dotenv'
import app from '../app.js'

dotenv.config()

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
  })
}

startServer()
