import express from "express"
import { testScrape } from "./nfl/team.js"
const app = express();

app.use(express.json());


app.get("/getDepthChart", async (req, res) => {
    res.json(await testScrape(req.query.team, req.query.year))
});

app.get("/getFullPlayerData", async (req, res) => {
    // team.getFullPlayerData(req.body.ext)
});

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});

