/*
--------------------------------------------------------
-----            Player File - index.js            -----
-----  File for interacting with AJAX for players  -----
-----                Chris Danyluk                 -----
--------------------------------------------------------
*/


let players = [];

async function readSave() {
    try {
        let response = await fetch("./players.json");
        let data = await response.json();

        if (response.status === 200)
            for (let i in data) {
                players.push(data[i]);
                document.getElementsByClassName("card-title")[i].innerHTML = data[i].name;
            }
    } catch (error) {
        throw error;
    }
}

function loadCharacter(id) {
    let form = document.getElementById("loadCharacter");
    form.childNodes[1].value = id;
    form.submit();
}