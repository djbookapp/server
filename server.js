'use strict';

//Requires
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

//Additional consts
const app = express();
const PORT = process.env.PORT;
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);

//connect to db
client.connect();

//set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//set up cors
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//GETS
app.get('/api/v1/books', (req,res) => {
  client.query('SELECT book_id,title,author,imgUrl FROM books;')
    .then(result => res.send(result.rows))
});

app.get('/api/v1/books/:id', (req,res) => {
  client.query(
    'SELECT * FROM books WHERE book_id=$1;',
    [req.params.id])
    .then(result => res.send(result.rows))
});

//POSTS
app.post('/api/db', (req,res) => {
  client.query(
    'INSERT INTO books (author,title,isbn,imgUrl,description) VALUES($1,$2,$3,$4,$5);',
    [req.body.author, req.body.title, req.body.isbn, req.body.imgUrl, req.body.description],
    err => console.error(err)
  );
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
