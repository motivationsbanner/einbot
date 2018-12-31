import { PlayCardAction } from "./actions/playCardAction";
import { PlayerAction } from "./actions/playerAction";
import { Card } from "./cards/card";
import { DrawStack } from "./drawStack";
import { Player } from "./players/player";

export class Game {
  private drawStack: DrawStack = new DrawStack();
  private activePlayerIndex: number = 0;
  private direction: boolean = false;
  private running: boolean = false;
  private drewCard: boolean = false;
  private log: string = "";

  constructor(public players: Player[]) {
  }

  /**
   * all cards are put into the drawstack
   * each player draws 7 cards and then it starts the game
   * the parameter automaticRun makes it possible if the game should run automatically
   *  or if you want to step through each turn individually
   * it returns the log of this game
   */
  public startGame(automaticRun: boolean): string {
    this.log = "";
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
    this.writeToLog("Starting the game with the following Players: ");
    for (const player of this.players) {
      this.writeToLog("\n" + player.playerName);
    }
    // game loop it loops as runs as long as the game is running
    while (this.running && automaticRun) {
      this.writeToLog(this.playTurn());
    }
    return this.log;
  }

  /**
   * get the size of the drawStack
   */
  public getDrawStackSize(): number {
    return this.drawStack.length;
  }

  /**
   * get the topcard of the gamestack
   */
  public get topCard(): Card {
    return null;
  }

  /**
   * this function plays exactly one turn
   * one turn means that one player starts it and he then ends it
   * a turn can have more than one actions from a player
   */
  public playTurn(): string {
    let turnlog: string = "";
    const action: PlayerAction = this.currentPlayer.play(this);
    if (action instanceof PlayCardAction) {
      // checks if the card can be played

      // it removes the card specified in the action from the hand and then adds it to the game stack

      turnlog = turnlog.concat("\n" + this.currentPlayer.playerName + " played a card");
      // check if this player has no more cards in his hand which means he won
      if (this.currentPlayer.hand.length === 0) {
        this.running = false;
        turnlog = turnlog.concat("\n" + this.currentPlayer.playerName + " won");
        return turnlog;
      }
      // it ends the turn
      turnlog = turnlog.concat("\n" + this.currentPlayer.playerName + " ended his turn");
      this.endTurn();
      return turnlog;
    } else {
      // if the player hasnt drawn a card yet
      if (!this.drewCard) {
        // the player draws a card from the draw stack
        this.currentPlayer.hand.push(this.drawStack.draw());
        this.drewCard = true;
        turnlog = turnlog.concat("\n" + this.currentPlayer.playerName + " drew a card");
      } else {
        this.endTurn();
        turnlog = turnlog.concat("\n" + this.currentPlayer.playerName + " ended his turn");
        return turnlog;
      }
    }
    turnlog = turnlog.concat(this.playTurn());
    return turnlog;
  }
  /**
   * get the current Player
   */
  private get currentPlayer(): Player {
    return this.players[this.activePlayerIndex];
  }

  private writeToLog(text: string): void {
    this.log = this.log.concat(text);
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
