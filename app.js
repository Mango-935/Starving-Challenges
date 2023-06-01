/*
-----------------------------------------------------
-----            Server File - app.js           -----
-----  Backend file in charge of serving pages  -----
-----               Chris Danyluk               -----
-----------------------------------------------------
*/


const express = require('express');
const ejs = require('ejs');


const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('data'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {title: "Starving Games"});
});

app.get('/creator', (req, res) => {
  res.render('creator', {title: "Character Creator"});
});

module.exports = app;