const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express();
const IS_PRODUCTION = app.get('env') === 'production';

if (IS_PRODUCTION) {
    app.set('trust proxy', 1)
}
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
module.exports = app;