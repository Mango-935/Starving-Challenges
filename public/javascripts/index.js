/*
--------------------------------------------------------
-----            Player File - index.js            -----
-----  File for interacting with AJAX for players  -----
-----                Chris Danyluk                 -----
--------------------------------------------------------
*/


let players = []; //Creates a blank array for holding players

async function readSave() { //Reads the player's save file
    try {
        let response = await fetch("./players.json"); //Try to fetch players.json to a variable
        let data = await response.json(); //Try to read and convert the response variable to JSON format

        if (response.status === 200) //If 'OK'
            for (let i in data) { //Go through every index of the JSON file
                players.push(data[i]); //Add every player to the blank players array
                document.getElementsByClassName("card-title")[i].innerHTML = data[i].name; //Display each player in their own card
            }
    } catch (error) { //Catch all errors
        throw error; //Throw error at user
    }
}

function loadCharacter(id) { //Called when user selects a unique character to edit
    let form = document.getElementById("loadCharacter"); //Save the form to a variable
    form.childNodes[1].value = id; //Set the hidden input in the form to have a value matching the selected character id
    form.submit(); //Submit the form to the server
}