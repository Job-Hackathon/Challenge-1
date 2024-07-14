const express = require("express");
const router = express.Router();

const fs = require("fs");
const csv = require("csv-parser");

const csvFilePath = "../DATA/airport_data.csv";

const { close_airports } = require('./apifetcher');

router.post('/api/v1/close-airports', async (req, res) => {

    const { originAirportCode, maxRadius, targetWeather, minimalTemperature, maximalTemperature } = req.body;
    const ca = await close_airports(originAirportCode, maxRadius, targetWeather, minimalTemperature, maximalTemperature);
    res.json(ca);

});



router.get("/", (req, res) => {});

router.get("/api/v1/airport_list", (req, res) => {
  const { substring } = req.query;

  if (!substring) {
    return res
      .status(400)
      .json({ error: "Missing query parameter: substring" });
  }

  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      const airportName = row["airport"];

      if (airportName.toLowerCase().includes(substring.toLowerCase())) {
        results.push(row);
      }
    })
    .on("end", () => {
      res.json(results);
    });
});

module.exports = router;

