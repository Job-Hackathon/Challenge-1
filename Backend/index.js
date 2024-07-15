const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const router = require("./router");
const bodyParser = require("body-parser");

express()
  .use(cors({
    origin: 'http://45.93.250.193:4000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))
  .use(bodyParser.json())
  .use("/", router)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));