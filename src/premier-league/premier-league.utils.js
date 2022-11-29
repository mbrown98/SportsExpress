import puppeteer from 'puppeteer'

export const PL_UTILS = {
  launchBrowserAndPage: async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    return { page, browser }
  },

  closeCookies: async (page) => {
    page
      .waitForSelector('.js-accept-all-close', { visible: true })
      .then((elem) => elem.click())
  },

  getFixtureData: async (page) => {
    try {
      const data = await page.evaluate(
        'document.querySelector(".mcTabsContainer").getAttribute("data-fixture")'
      )
      return await JSON.parse(data)
    } catch (error) {
      throw Error(error)
    }
  },

  getPlayerData: async (page) => {
    try {
      const data = {}
      data.country = await page.evaluate(
        PREMIER_LEAGUE_STRINGS.getPlayerCountry
      )
      await page.waitForFunction(PREMIER_LEAGUE_STRINGS.waitForPlayerImage)
      data.img = await page.evaluate(PREMIER_LEAGUE_STRINGS.getPlayerImage)
      data.playerName = await page.evaluate(
        PREMIER_LEAGUE_STRINGS.getPlayerName
      )
      data.jerseyNumber = await page.evaluate(
        PREMIER_LEAGUE_STRINGS.getPlayerNumber
      )
      return data
    } catch (error) {
      throw Error(error)
    }
  },
}

const PREMIER_LEAGUE_STRINGS = {
  getPlayerCountry: 'document.querySelector(".playerCountry").innerText',
  waitForPlayerImage: `document.querySelector("[data-script='pl_player-image']").getAttribute('src') != "//resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png"`,
  getPlayerImage: `document.querySelector("[data-script='pl_player-image']").getAttribute('src')`,
  getPlayerName: `document.querySelector(".playerDetails .name").innerText`,
  getPlayerNumber: `document.querySelector(".playerDetails .number").innerText`,
}
