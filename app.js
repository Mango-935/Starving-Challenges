/*
-----------------------------------------------------
-----            Server File - app.js           -----
-----  Backend file in charge of serving pages  -----
-----               Chris Danyluk               -----
-----------------------------------------------------
*/


const express = require('express'); //Imports the express module, which is what I will be using to host the server
const ejs = require('ejs'); //Imports the ejs module, which is the view engine I will be working with ('ejs' stands for extended javascript)
const fs = require('fs'); //Imports the filesystem module, which is how I will be interacting with the JSON files containing game data


const app = express(); //Returns an express application and saves it to the app variable so I don't have to keep creating and calling it
app.use(express.json()); //Tells the express application to interact with JSON files
app.use(express.urlencoded({ extended: false })); //Allows the express application to interact with data passed to it from client-side
app.use(express.static('public')); //Tells express where to look for static files, public is where my images, javascripts, stylesheets, and templates will be stored
app.use(express.static('data')); //Tells express where to look for static files, data is where my JSON files relating to game data will be stored
app.set('view engine', 'ejs'); //Sets the view engine that express will use to be ejs

app.get('/', (req, res) => { //Gets requests to the root route
  res.render('index', {title: "Starving Games"}); //Renders the root 'index' page
});

app.post('/creator', (req, res) => { //Gets requests to the creator route from POST methods
  res.render('creator', {title: "Character Creator", data: req.body.data}); //Renders the creator page and passes on the selected character
});

app.post('/save', (req, res) => { //Gets requests to save data from POST methods
  const data = JSON.parse(fs.readFileSync('./data/players.json')); //Get the 
  //NOTE: Given the fact that this website isn't meant to be hosted on a public website, I have no problems with having one local save file
  data[req.body.id] = { //Get the creator block
    name: req.body.name, //Retrieve the name
    gender: req.body.gender, //Retrive the gender
    str: Number(req.body.str), //Retrieve the STR stat and cast it to an int
    dex: Number(req.body.dex), //Retrieve the DEX stat and cast it to an int
    con: Number(req.body.con), //Retrieve the CON stat and cast it to an int
    int: Number(req.body.int), //Retrieve the INT stat and cast it to an int
    wis: Number(req.body.wis), //Retrieve the WIS stat and cast it to an int
    cha: Number(req.body.cha), //Retrieve the CHA stat and cast it to an int
    attributes: req.body.attributes.map(Number), //Retrieve the attributes list, map it to a new array, and then cast each mapping to an int
    wins: data[req.body.id].wins //Sets the wins to the current value
  }; //Overwrite the data in the character's block

  fs.writeFileSync('./data/players.json', JSON.stringify(data, null, 2), 'utf8'); //Write the new block to the players.json file
});

module.exports = app; //Exports the express application to be used by other files, such as the www file in the bin folder