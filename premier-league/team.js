import puppeteer from 'puppeteer'

export const getMatchInfo = async (matchID) => {
  const BASE = 'https://www.premierleague.com/match/'
  try {
    const { browser, page } = await UTILS.launchBrowserAndPage()
    await page.goto(BASE + matchID)
    const data = await UTILS.getFixtureData(page)
    await browser.close()
    return data
  } catch (error) {
    return { error: error.message }
  }
}

export const getPlayerInfo = async (playerID) => {
  const BASE = 'https://www.premierleague.com/players/'
  try {
    const { browser, page } = await UTILS.launchBrowserAndPage()
    console.log({ playerID })
    await page.goto(BASE + playerID)
    const data = await UTILS.getPlayerData(page)
    browser.close()
    return data
  } catch (error) {
    return { error: error.message }
  }
}

const UTILS = {
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
      data.country = await page.evaluate(STRINGS.getPlayerCountry)
      await page.waitForFunction(STRINGS.waitForPlayerImage)
      data.img = await page.evaluate(STRINGS.getPlayerImage)
      data.playerName = await page.evaluate(STRINGS.getPlayerName)
      data.jerseyNumber = await page.evaluate(STRINGS.getPlayerNumber)
      return data
    } catch (error) {
      throw Error(error)
    }
  },
}

const STRINGS = {
  getPlayerCountry: 'document.querySelector(".playerCountry").innerText',
  waitForPlayerImage: `document.querySelector("[data-script='pl_player-image']").getAttribute('src') != "//resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png"`,
  getPlayerImage: `document.querySelector("[data-script='pl_player-image']").getAttribute('src')`,
  getPlayerName: `document.querySelector(".playerDetails .name").innerText`,
  getPlayerNumber: `document.querySelector(".playerDetails .number").innerText`,
}
