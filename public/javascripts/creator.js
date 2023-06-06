/*
-----------------------------------------------------------
-----      Character Creator Script - creator.js      -----
-----  Backend javascript for character creator page  -----
-----                  Chris Danyluk                  -----
-----------------------------------------------------------
*/


let player;

async function readData(data) {
    if (player == null)
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

function saveData(data) {
    let save = {
        id: data,
        name: document.getElementById("name").value,
        gender: document.getElementById("gender").value,
        str: document.getElementById("str").value,
        dex: document.getElementById("dex").value,
        con: document.getElementById("con").value,
        int: document.getElementById("int").value,
        wis: document.getElementById("wis").value,
        cha: document.getElementById("cha").value,
        attributes: player.attributes
    };
    fetch("./save", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(save)
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(err => console.error(err))
}