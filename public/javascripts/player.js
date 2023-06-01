"use strict";
/*
--------------------------------------------------------
-----         Player Class File - player.js        -----
-----  Class for carrying player data and methods  -----
-----                Chris Danyluk                 -----
--------------------------------------------------------
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player() {
        this.name = "";
    }
    Player.prototype.setName = function (name) {
        this.name = name;
    };
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.getSavedPlayer = function (characterData) {
        var player = new Player();
        player.setName(characterData.name);
        return player;
    };
    return Player;
}());
exports.Player = Player;
