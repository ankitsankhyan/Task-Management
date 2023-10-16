const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./config/db.js');
const date = require('date-and-time');
const port = 3000;

app.use(express.json());



const cors = require('cors');
app.use(cors());

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
    });