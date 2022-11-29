import express from 'express'
import { getFullPlayerData, testScrape } from './nfl/team.js'
import { getMatchInfo, getPlayerInfo } from './premier-league/team.js'
const app = express()

app.use(express.json())

app.get('/getDepthChart', async (req, res) => {
  res.json(await testScrape(req.query.team, req.query.year))
})

app.get('/getFullPlayerData', async (req, res) => {
  console.log(req.query)
  res.json(await getFullPlayerData(req.query.href))
})

app.get('/getPremierLeagueGame', async (req, res) => {
  res.json(await getMatchInfo(req.body.matchID))
})

app.get('/getPlayerInfo', async (req, res) => {
  res.json(await getPlayerInfo(req.body.playerID))
})

app.listen(3000, () => {
  console.log('Listen on the port 3000...')
})
