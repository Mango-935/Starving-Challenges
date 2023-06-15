/*
-----------------------------------------------------------
-----      Character Creator Script - creator.js      -----
-----  Backend javascript for character creator page  -----
-----                  Chris Danyluk                  -----
-----------------------------------------------------------
*/


let player = null; //Variable containing specific player info
let attributeMap = null; //Variable containing all attribute data

async function readData(data) { //Called on page load, displays saved player data
    if (player == null) //If the data has not yet been loaded in
        player = await getPlayerInfo(data); //Retrieve saved player and attribute data
    document.getElementById("name").value = player.name; //Set name field to the player's current name
    document.getElementById("gender").value = player.gender; //Set the gender drop-down box the player's current gender
    for (let i = 0; i < 6; i++) //Cycle through each of the six stats
        document.getElementsByClassName("stats")[i].value = player[document.getElementsByClassName("stats")[i].id]; //Set the given number field to the player's given stat
    for (let i of attributeMap) { //Cycle through every attribute in the attributes file
        if (player.attributes.indexOf(i.id) !== -1) { //If the attribute appears in the players attribute list, add it to the attribute view div
            const aButton = document.createElement("button"); //Create a new button
            aButton.value = i.id; //Set its value to the attribute id. NOTE: attribute id is sorted by how they appear in the attributes.json file
            aButton.innerHTML = i.name + "<span>x</span>"; //Set its text to the attribute name and gives it a closable x button
            aButton.className = "close";
            aButton.onclick = function() {attributeChange(false, this)}; //Add the onClick attribute to run the attribute removal function
            document.getElementById("attribute_box").appendChild(aButton); //Add the button to the attribute view div
        }
        else //If the attribute doesn't appear in the player attribute list, add it to the attribute drop down box
            document.getElementById("attribute_select").add(new Option(i.name, i.id), undefined); //Add a new option with the text 'name' and the value 'id' to the attribute drop-down box
    }
    document.getElementById("wins").innerHTML = "Wins: " + player.wins; //Set the wins text to the players win count
}

async function getPlayerInfo(id) { //Retrieve this specific saved player and attribute data
    try {
        let response = await fetch("./players.json"); //Try to fetch the saved players JSON file to a variable
        let data = await response.json(); //Try to convert the response variable to JSON

        let aResponse = await fetch("./attributes.json"); //Try to fetch the complete attribute JSON file to a variable
        attributeMap = await aResponse.json(); //Try to convert the attribute response variable to JSON

        return data[id]; //Return the block of data with the players info on it
    }
    catch (error) { //Catch all errors
        throw error; //Throw the error
    }
}

function attributeChange(option, element = null) { //option = true for add, option = false & element = this for remove
    let attrSelector = document.getElementById("attribute_select"); //Save the attribute drop-down box to a variable for ease of access.
    if (option) { //If adding an attribute to the players list, and removing it from the drop down
        let attrValue = attrSelector[attrSelector.selectedIndex]; //Get the option element that has just been selected

        const aButton = document.createElement("button"); //Create a new button
        aButton.value = attrValue.value; //Set its value to the option value
        aButton.innerHTML = attrValue.innerHTML + "<span>x</span>"; //Set its text to the option text and gives it a closable x button
        aButton.className = "close";
        aButton.onclick = function() {attributeChange(false, this)}; //Add the onClick attribute to run the attribute removal function
        document.getElementById("attribute_box").appendChild(aButton); //Add the button to the attribute view div
        
        attrSelector.remove(attrSelector.selectedIndex); //Remove the attribute from the drop down box
    }
    else if (!option) { //If removing an attribute from the players list, and adding it to the drop down
        document.getElementById("attribute_select").add(new Option(element.innerHTML, element.value), undefined); //Add the data contained in the attribute button in the list to the drop down
        element.remove(); //Remove the attribute button from the player's list
    }
}

function saveData(data) { //Saves the current defined data fields to the player json
    let attributes = []; //Create a blank array for attributes
    for (let i of document.getElementById("attribute_box").children) //Cycle through every attribute selected for the player
        attributes.push(i.value); //Add the attributes to the array
    attributes.sort((a, b) => {a - b}); //Sort the array. NOTE: This actually isn't needed, as the players attributes are read in in order, this just saves it sorted

    let save = { //Create a JSON object for the save data
        id: data, //Set the player id to the data variable passed in from app.js when the page was loading
        name: document.getElementById("name").value, //Set the saved name to the value in the name field
        gender: document.getElementById("gender").value, //Set the saved gender to the value in the gender drop down box
        str: document.getElementById("str").value, //Set the saved STR to the value in the str number field
        dex: document.getElementById("dex").value, //Set the saved DEX to the value in the dex number field
        con: document.getElementById("con").value, //Set the saved CON to the value in the con number field
        int: document.getElementById("int").value, //Set the saved INT to the value in the int number field
        wis: document.getElementById("wis").value, //Set the saved WIS to the value in the wis number field
        cha: document.getElementById("cha").value, //Set the saved CHA to the value in the cha number field
        attributes: attributes //Set the saved attributes to the array of attributes created above
    };
    fetch("./save", { //Run the fetch api with the route '/save'
        method: "POST", //Run it as a POST request
        headers: {"Content-Type": "application/json"}, //Set the data type being passed through as JSON
        body: JSON.stringify(save) //Pass the JSON object through as a string, as you can't actually pass JSON objects to the server
    })
    .then(response => response.text()) //When finished, convert the response to text
    .then(data => console.log(data)) //When finished, log the returned data from the POST request
    .catch(err => console.error(err)) //When there is an error, log it
}