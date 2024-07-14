const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const router = require("./router");
const bodyParser = require("body-parser");

express()
  .use(cors())
  .use(bodyParser.json())
  .use("/", router)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
