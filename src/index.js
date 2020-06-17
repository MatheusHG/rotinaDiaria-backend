const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express() 

app.use(cors())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false })) 

require('./controllers/authController')(app) 
require('./controllers/activityController')(app)

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Connection, authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.listen(process.env.PORT || 3000)
