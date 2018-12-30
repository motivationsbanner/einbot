import { DrawStack } from "./drawStack";
import { Player } from "./players/player";

export class Game {
  private drawStack: DrawStack = new DrawStack();
  private activePlayerIndex: number = 0;
  private direction: boolean = false;

  constructor(public players: Player[]) {
    this.restartGame();
  }

  /**
   * all cards are put into the drawstack
   * each player draws 7 cards and then it starts the game
   */
  public restartGame(): void {
    // adds all the cards that the players have on their hands to the draw pile
    for (const player of this.players) {
      this.drawStack.addCardsToStack(player.hand);
      player.hand = [];
    }
    // todo add all cards from the gameStack to the drawStack
    // give each player 7 cards
    for (const player of this.players) {
      for (let j: number = 0; j <= 6; j++) {
        player.hand.push(this.drawStack.draw());
      }
    }
  }

  /**
   * get the size of the drawStack
   */
  public getDrawStackSize(): number {
    return this.drawStack.length;
  }

  /**
   * get the current Player
   */
  private getCurrentPlayer(): Player {
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
