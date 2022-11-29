import express from 'express'
import premierLeagueRouter from './premier-league/premier-league.router.js'

const api = express.Router()

api.use('/premierLeague', premierLeagueRouter)

export default api
