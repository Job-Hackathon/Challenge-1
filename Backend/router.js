const express = require('express');
const router = express.Router();
const { close_airports, close_airports } = require('./apifetcher');

router.post('/api/v1/close-airports', (req, res) => {

    const { originairportcode, maxradius, startdate } = req.body;
    const ca = close_airports()

});

module.exports = router;