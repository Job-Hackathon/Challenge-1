const express = require('express')
const PORT = process.env.PORT || 4000
const router = require('./router');
const bodyParser = require('body-parser');

express()
  .use(bodyParser.urlencoded({extended: false}))
  .use('/', router)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))