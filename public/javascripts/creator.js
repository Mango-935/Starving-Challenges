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
    document.getElementById("name").value = player.name;
    document.getElementById("gender").value = player.gender;
    for (let i = 0; i < 6; i++)
        document.getElementsByClassName("stats")[i].value = player[document.getElementsByClassName("stats")[i].id];
    document.getElementById("wins").innerHTML = "Wins: " + player.wins;
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