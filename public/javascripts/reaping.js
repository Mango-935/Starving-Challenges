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
    let activePlayers = [];

    for (let i = 0; i < 25; i++)
        map[i] = [];
    
    for (let i in players) {
        map[12].push(Number(i));
        players[i].inventory = [];
        players[i].isAlive = true;
        players[i].mapTile = 12;
        activePlayers.push(Number(i));
    }
    
    playRound(activePlayers);
}

function continueGame() {
    let activePlayers = [];

    for (let i in players) {
        if (players[i].isAlive)
            activePlayers.push(Number(i));
    }
    
    playRound(activePlayers);
}

function viewMap() {
    document.getElementById("gameRound").innerHTML = "";
    for (let i = 0; i < players.length; i++)
        document.getElementById("gameRound").innerHTML += players[i].name + " " + players[i].isAlive + "<br>";
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
        if (mapTile + rowCount >= 0 && mapTile + rowCount <= 24 && (mapTile % 5) + colCount >= 0 && (mapTile % 5) + colCount <= 4)
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

function playRound(activePlayers) {
    let deadCount = [];
    document.getElementById("gameRound").innerHTML = "";
    while (activePlayers.length > 0) {
        let sP = activePlayers.splice(Math.floor(Math.random() * activePlayers.length), 1);
        let adjacent = getAdjacentPlayers(players[sP].mapTile, sP, activePlayers);
        let possibilities = [];
        for (let i in encounters)
            if (encounters[i].pCount <= adjacent.length + 1 && ((stage >= 1 && encounters[i].stage === -1) || (stage === 0 && encounters[i].stage === 0)))
                possibilities.push(i);
        possibilities = possibilities.splice(Math.floor(Math.random() * possibilities.length), 1);
        let eventText = encounters[possibilities].text.replace("~PLAYER_NAME_0~", players[sP].name);
        if (encounters[possibilities].dCount.includes(0))
            deadCount.push(sP);
        if (encounters[possibilities].pCount > 1) {
            let i = 1;
            do {
                let aP = adjacent.splice(Math.floor(Math.random() * adjacent.length), 1);
                activePlayers.splice(activePlayers.indexOf(aP[0]), 1);
                eventText = eventText.replace("~PLAYER_NAME_" + i + "~", players[aP].name);
                if (encounters[possibilities].dCount.includes(i))
                    deadCount.push(aP);
                i++;
            } while (i < encounters[possibilities].pCount);
        }
        document.getElementById("gameRound").innerHTML += eventText + "<br>";
    }

    for (let i = 0; i < deadCount.length; i++)
        players[deadCount[i]].isAlive = false;

    stage++;
}