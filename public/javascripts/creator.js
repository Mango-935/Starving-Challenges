/*
-----------------------------------------------------------
-----      Character Creator Script - creator.js      -----
-----  Backend javascript for character creator page  -----
-----                  Chris Danyluk                  -----
-----------------------------------------------------------
*/


let player;
let attributeMap;

async function readData(data) {
    if (player == null)
        player = await getPlayerInfo(data);
    document.getElementById("name").value = player.name;
    document.getElementById("gender").value = player.gender;
    for (let i = 0; i < 6; i++)
        document.getElementsByClassName("stats")[i].value = player[document.getElementsByClassName("stats")[i].id];
    for (let i of attributeMap) {
        if (player.attributes.indexOf(i.id) !== -1) {
            const aButton = document.createElement("button");
            aButton.value = i.id;
            aButton.innerHTML = i.name;
            aButton.onclick = function() {attributeChange(false, this)};
            document.getElementById("attribute_box").appendChild(aButton);
        }
        else
            document.getElementById("attribute_select").add(new Option(i.name, i.id), undefined);
    }
    document.getElementById("wins").innerHTML = "Wins: " + player.wins;
}

async function getPlayerInfo(id) {
    try {
        let response = await fetch("./players.json");
        let data = await response.json();

        let aResponse = await fetch("./attributes.json");
        attributeMap = await aResponse.json();

        return data[id];
    }
    catch (error) {
        console.error(error);
    }
}

function attributeChange(option, element = null) { //true for add, false for remove
    let attrSelector = document.getElementById("attribute_select");
    if (option) {
        let attrValue = attrSelector[attrSelector.selectedIndex];

        const aButton = document.createElement("button");
        aButton.value = attrValue.value;
        aButton.innerHTML = attrValue.innerHTML;
        aButton.onclick = function() {attributeChange(false, this)};
        document.getElementById("attribute_box").appendChild(aButton);
        
        attrSelector.remove(attrSelector.selectedIndex);
    }
    else if (!option) {
        document.getElementById("attribute_select").add(new Option(element.innerHTML, element.value), undefined);
        element.remove();
    }
}

function saveData(data) {
    let attributes = [];
    for (let i of document.getElementById("attribute_box").children)
        attributes.push(i.value);
    attributes.sort((a, b) => {a - b});

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
        attributes: attributes
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