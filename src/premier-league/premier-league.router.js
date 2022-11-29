import express from 'express'
import controller from './premier-league.controller'

const premierLeagueRouter = express.Router()

premierLeagueRouter.get('/match', controller.getMatchInfo)
premierLeagueRouter.get('/player', controller.getPlayerInfo)

export default premierLeagueRouter
