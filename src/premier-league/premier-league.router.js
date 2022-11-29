import express from 'express'
import { getMatchInfo, getPlayerInfo } from './premier-league.controller.js'

const premierLeagueRouter = express.Router()

premierLeagueRouter.get('/match', getMatchInfo)
premierLeagueRouter.get('/player', getPlayerInfo)

export default premierLeagueRouter
