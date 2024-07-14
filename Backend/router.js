const express = require('express');
const router = express.Router();
const { close_airports } = require('./apifetcher');

router.post('/api/v1/close-airports', (req, res) => {

    const { originAirportCode, maxRadius, targetWeather, minimalTemperature, maximalTemperature } = req.body;
    const ca = close_airports(originAirportCode, maxRadius, targetWeather, minimalTemperature, maximalTemperature);
    res.json(ca)

});

module.exports = router;