'use strict';

//Requires
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

//Additional consts
const app = express();
const PORT = process.env.PORT || 3000;
const conString = process.env.DATABASE_URL || 'database';
const client = new pg.Client(conString);

//connect to db
client.connect();

//set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`);
