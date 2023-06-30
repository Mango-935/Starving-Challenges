/*
-----------------------------------------------------------------------------------
-----                       Reaping Script - creator.js                       -----
-----  Backend javascript for the main game page and it's core functionality  -----
-----                              Chris Danyluk                              -----
-----------------------------------------------------------------------------------
*/

let players = null;
let encounters = null;
let map = [];
let stage = 0;

async function startGame() {
    await getPlayers();
    let activePlayers = []

    for (let i = 0; i < 25; i++)
        map[i] = {players: []};
    
    for (let i in players) {
        map[12].players.push(Number(i));
        players[i].inventory = [];
        players[i].isAlive = true;
        players[i].mapTile = 12;
        activePlayers.push(i);
    }
    
    while (activePlayers.length > 0) {
        let sP = activePlayers.splice(Math.floor(Math.random() * activePlayers.length), 1);
        let adjacent = getAdjacentPlayers(players[sP].mapTile, sP, activePlayers);
        let possibilities = [];
        for (let i in encounters)
            if (encounters[i].pCount <= adjacent.length + 1)
                possibilities.push(i);
        possibilities = possibilities.splice(Math.floor(Math.random() * possibilities.length), 1);

        document.getElementById("test").innerHTML += "<br>" + encounters[possibilities].text.replace("PLAYER_NAME", players[sP].name);
    }
}

async function getPlayers() {
    try {
        let response = await fetch("./players.json"); //Try to fetch the saved players JSON file to a variable
        let data = await response.json(); //Try to convert the response variable to JSON

        let eResponse = await fetch("./encounters.json"); //Try to fetch the available encounters JSON file to a variable
        let eData = await eResponse.json(); //Try to convert the response variable to JSON

        players = data;
        encounters = eData;
    }
    catch (error) { //Catch all errors
        throw error; //Throw the error
    }
}

function getAdjacentPlayers(mapTile, pID, active) {
    let rowCount = -5;
    let colCount = -1;
    let adjacentPlayers = [];
    do {
        if (mapTile + rowCount >= 0 && (mapTile % 5) + colCount >= 0 && (mapTile % 5) + colCount <= 5)
            adjacentPlayers = adjacentPlayers.concat(map[mapTile + rowCount + colCount]);
        if (colCount === 1) {
            rowCount += 5;
            colCount = -1;
        }
        else
            colCount++;
    } while (rowCount != 10);
    adjacentPlayers.splice(adjacentPlayers.indexOf(pID), 1);
    adjacentPlayers = adjacentPlayers.filter((value) => {return active.includes(value)});
    return adjacentPlayers;
}