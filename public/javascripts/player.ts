/*
--------------------------------------------------------
-----         Player Class File - player.js        -----
-----  Class for carrying player data and methods  -----
-----                Chris Danyluk                 -----
--------------------------------------------------------
*/


export class Player {
    private name: string;

    public constructor() {
        this.name = "";
    }

    public setName(name:string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public getSavedPlayer(characterData: any): Player {
        let player = new Player();
        player.setName(characterData.name);
        return player;
    }
}