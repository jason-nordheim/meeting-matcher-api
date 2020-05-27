const config = { port: process.env.PORT || 4000}
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')

// setup 
const app = express()
app.use(cors())
app.use(bodyParser.json()) 



app.listen(
    config.port, 
    ()=> console.log(`Meeting Matcher API started. Listening on port ${config.port}...`)
); 