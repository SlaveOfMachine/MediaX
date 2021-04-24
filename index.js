require('dotenv').config();
const logger = require('./config/logger');
global.logger = logger;

const express = require('express');
const app = express();
const cors = require("cors");
const routes = require('./routes');
const db = require('./config/database');
const corsDomains = require('./config/corsDomains');

const { SERVER_PORT, SERVER_URL } = process.env;

var corsOptions = {
    origin: corsDomains,
};

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions));
app.use('/api', routes);

app.listen(SERVER_PORT, () => {
    console.log(`Base url: ${SERVER_URL}:${SERVER_PORT}`)
})