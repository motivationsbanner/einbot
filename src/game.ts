import { DrawStack } from "./drawStack";
import { Player } from "./players/player";

export class Game {
  private drawStack: DrawStack = new DrawStack();
  private activePlayerIndex: number = 0;
  private direction: boolean = false;

  constructor(public players: Player[]) { }

  /**
   * get the current Player
   */
  private get currentPlayer(): Player {
    return this.players[this.activePlayerIndex];
  }

  /**
   * it changes the Position of the activePlayerIndex depending in which direction
   * the game is currently being played
   */
  private endTurn(): void {
    if (this.direction) {
      this.activePlayerIndex++;
    } else {
      this.activePlayerIndex += this.players.length - 1;
    }

    this.activePlayerIndex %= this.players.length;
  }
}
