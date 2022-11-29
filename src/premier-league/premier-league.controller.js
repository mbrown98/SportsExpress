import { PL_UTILS } from './premier-league.utils'

const PL_CONTROLLER = {
  getMatchInfo: async (req, res) => {
    const { matchID } = req.body
    const BASE = 'https://www.premierleague.com/match/'
    try {
      const { browser, page } = await PL_UTILS.launchBrowserAndPage()
      await page.goto(BASE + matchID)
      const data = await PL_UTILS.getFixtureData(page)
      await browser.close()
      res.json(data)
    } catch (error) {
      res.json({ error: error.message })
    }
  },

  getPlayerInfo: async (req, res) => {
    const { playerID } = req.body
    const BASE = 'https://www.premierleague.com/players/'
    try {
      const { browser, page } = await PL_UTILS.launchBrowserAndPage()
      await page.goto(BASE + playerID)
      const data = await PL_UTILS.getPlayerData(page)
      browser.close()
      res.json(data)
    } catch (error) {
      res.json({ error: error.message })
    }
  },
}

export default PL_CONTROLLER
