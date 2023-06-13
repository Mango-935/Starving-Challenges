/*
-----------------------------------------------------
-----            Server File - app.js           -----
-----  Backend file in charge of serving pages  -----
-----               Chris Danyluk               -----
-----------------------------------------------------
*/


const express = require('express');
const ejs = require('ejs');
const fs = require('fs');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('data'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {title: "Starving Games"});
});

app.post('/creator', (req, res) => {
  res.render('creator', {title: "Character Creator", data: req.body.data});
});

app.post('/save', (req, res) => { //NOTE: Given the fact that this website isn't meant to be hosted on a public website, I have no problems with having one local save file
  const data = JSON.parse(fs.readFileSync('./data/players.json')); //Get the creator block

  data[req.body.id] = {
    name: req.body.name,
    gender: req.body.gender,
    str: Number(req.body.str),
    dex: Number(req.body.dex),
    con: Number(req.body.con),
    int: Number(req.body.int),
    wis: Number(req.body.wis),
    cha: Number(req.body.cha),
    attributes: req.body.attributes.map(Number),
    wins: data[req.body.id].wins
  }; //Overwrite the data in the character's block

  fs.writeFileSync('./data/players.json', JSON.stringify(data, null, 2), 'utf8'); //Write the new block to the players.json file
});

module.exports = app;