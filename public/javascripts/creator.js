/*
-----------------------------------------------------------
-----      Character Creator Script - creator.js      -----
-----  Backend javascript for character creator page  -----
-----                  Chris Danyluk                  -----
-----------------------------------------------------------
*/


let player;

async function readData(data) {
    player = await getPlayerInfo(data);
    document.getElementById("test").innerHTML = player.name;
}

async function getPlayerInfo(id) {
    try {
        let response = await fetch("./players.json");
        let data = await response.json();
        return data[id];
    }
    catch (error) {
        console.error(error);
    }
}