const express = require("express");
const router = express.Router();

const fs = require("fs");
const csv = require("csv-parser");

const csvFilePath = "../DATA/airport_data.csv";

const { close_airports, get_cords_by_iata, get_airport_weather } = require('./apifetcher');

router.post('/api/v1/close-airports', async (req, res) => {


    const { originAirportCode, maxRadius, targetWeather, minimalTemperature, maximalTemperature } = req.body;

    try {
      const ca = await close_airports(originAirportCode, maxRadius, targetWeather, minimalTemperature, maximalTemperature);
      res.json(ca);
    } catch ({ name, message }){
      return res.status(400).send({
        message: message
     });
    }

});

router.get('/api/v1/airport-weather', async (req, res) => {
  
    try {
      const iata = req.query.iata;
      console.log(iata);
      const aw = await get_airport_weather(iata);
      console.log(aw)
      res.status(200).json(aw);
    } catch (e) {
      res.json({"error": e}).status(400)
    }

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

