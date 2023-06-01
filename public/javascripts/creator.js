/*
-----------------------------------------------------------
-----      Character Creator Script - creator.js      -----
-----  Backend javascript for character creator page  -----
-----                  Chris Danyluk                  -----
-----------------------------------------------------------
*/


const { Player } = require('./player.js');


let players = {};

function readSave() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {
        document.getElementById("test").innerHTML = xhttp.responseText;
        if (xhttp.responseText != "")
            for (let i of JSON.parse(xhttp.responseText)) {
                players.push(Player.getSavedPlayer(i));
            }
        else
            for (let i = 0; i < 24; i++) 
                players.push(new Player());
        document.getElementById("test").innerHTML = players[0].getName();
    }
    xhttp.open("GET", "./players.json", true);
    xhttp.send();
}