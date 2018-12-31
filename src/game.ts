import { PlayCardAction } from "./actions/playCardAction";
import { PlayerAction } from "./actions/playerAction";
import { DrawStack } from "./drawStack";
import { Player } from "./players/player";

export class Game {
  private drawStack: DrawStack = new DrawStack();
  private activePlayerIndex: number = 0;
  private direction: boolean = false;
  private running: boolean = false;
  private drewCard: boolean = false;

  constructor(public players: Player[], automaticRun: boolean) {
    this.restartGame(automaticRun);
  }

  /**
   * all cards are put into the drawstack
   * each player draws 7 cards and then it starts the game
   * the parameter automaticRun makes it possible if the game should run automatically
   *  or if you want to step through each turn individually
   */
  public restartGame(automaticRun: boolean): void {
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
    this.running = true;
    // game loop it loops as runs as long as the game is running
    while (this.running && automaticRun) {
      this.playTurn();
    }
  }

  /**
   * get the size of the drawStack
   */
  public getDrawStackSize(): number {
    return this.drawStack.length;
  }

  /**
   * this function plays exactly one turn
   * one turn means that one player starts it and he then ends it
   * a turn can have more than one actions from a player
   */
  public playTurn(): void {
    const action: PlayerAction = this.getCurrentPlayer().play(this);
    if (action instanceof PlayCardAction) {
      // checks if the card can be played

      // it removes the card specified in the action from the hand and then adds it to the game stack

      // check if this player has no more cards in his hand which means he won
      if (this.getCurrentPlayer().hand.length === 0) {
        this.running = false;
      }
      // it ends the turn
      this.endTurn();
      return;
    } else {
      // if the player hasnt drawn a card yet
      if (!this.drewCard) {
        // the player draws a card from the draw stack
        this.getCurrentPlayer().hand.push(this.drawStack.draw());
        this.drewCard = true;
      } else {
        this.endTurn();
        return;
      }
    }
    this.playTurn();
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
    this.drewCard = false;
    if (this.direction) {
      this.activePlayerIndex++;
    } else {
      this.activePlayerIndex += this.players.length - 1;
    }

    this.activePlayerIndex %= this.players.length;
  }
}
