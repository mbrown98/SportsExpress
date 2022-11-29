import got from "got"
import cheerio from "cheerio"

const BASE = "https://www.pro-football-reference.com"

export async function testScrape(team, year) {
    const URL = `https://www.pro-football-reference.com/teams/${team}/${year}_roster.htm`

    const $ = await fetchAndParseHTML(URL)

    const squad = {}

    $(".full_table").each((_, playerRow) => {
        const player = {}
        const fields = ["pos", "player", "age", "experience", "gs", "stat_summary"]
        fields.forEach(opt => {
            const dataField = $(playerRow).find(`[data-stat="${opt}"]`).text()
            player['href'] = $(playerRow).find("a").attr("href")
            if(dataField !== undefined) player[opt] = dataField
        })
        squad[player.player] = player

    })
    return squad
}

const fetchAndParseHTML = async (url) => {
    try {
        console.log({url})
        const response = await got(url)
        return cheerio.load(response.body)
    } catch (error) {
        return null
    }
}

export async function getFullPlayerData(ext) {
    const $ = await fetchAndParseHTML(BASE + ext)
    const player = {}
    player.img = $("#meta > div.media-item > img").attr("src")
    return player
}
