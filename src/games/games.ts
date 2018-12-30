import { Player } from "../players/player";

export class Game {
    private activePlayerIndex: number;
    private direction: boolean;
    constructor(public players: Player[]) {
        this.activePlayerIndex = 0;
        this.direction = false;
    }

    /**
     * returns the current Player
     */
    public getCurrentPlayer(): Player {
        return this.players[this.activePlayerIndex];
    }

    /**
     * it changes the Position of the activePlayerIndex depending in which direction the game is currently being played
     */
    public endTurn(): void {
        if (this.direction) {
            this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
        } else {
            this.activePlayerIndex = (this.activePlayerIndex - 1) + this.players.length % this.players.length;
        }
    }
}
