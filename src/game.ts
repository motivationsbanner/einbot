import { PlayCardAction } from "./actions/playCardAction";
import { PlayerAction } from "./actions/playerAction";
import { Card } from "./cards/card";
import { Logger } from "./loggers/logger";
import { Player } from "./players/player";
import { DrawStack } from "./stacks/drawStack";
import { GameStack } from "./stacks/gameStack";

export class Game {
  private drawStack: DrawStack = new DrawStack();
  private gameStack: GameStack = new GameStack();
  private running: boolean = false;
  private activePlayerIndex: number = 0;
  private direction: boolean = false;
  private drewCard: boolean = false;
  private skip: boolean = false;
  private drawCards: number = 0;

  /**
   * create a new game
   * @param players the players
   * @param logger the logger (default: no logger)
   */
  constructor(public players: Player[], private logger: Logger = null) { }

  /**
   * all cards are put into the drawstack
   * each player draws 7 cards and then it starts the game
   * the parameter automaticRun makes it possible if the game should run automatically
   * or if you want to step through each turn individually
   * it returns the log of this game
   */
  public startGame(automaticRun: boolean): void {
    this.activePlayerIndex = 0;
    this.direction = false;
    this.drewCard = false;
    this.skip = false;
    this.drawCards = 0;
    // adds all the cards that the players have on their hands to the draw pile
    for (const player of this.players) {
      this.drawStack.addCardsToStack(player.hand);
      player.hand = [];
    }

    // add all cards from the gameStack to the drawStack
    this.gameStack.addCardsToDrawStack(this.drawStack, false);

    // add one card to the gameStack
    this.gameStack.initialize(this.drawStack.draw());

    // give each player 7 cards
    for (const player of this.players) {
      for (let j: number = 0; j <= 6; j++) {
        player.hand.push(this.drawStack.draw());
      }
    }

    this.running = true;
    this.logInfo("Starting the game with the following Players: " + this.players);

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
   * get the topcard of the gamestack
   */
  public get topCard(): Card {
    return this.gameStack.topCard;
  }

  public switchDirection(): void {
    this.direction = !this.direction;
  }

  public addDrawCards(amount: number): void {
    this.drawCards += amount;
  }

  /**
   * this function plays exactly one turn
   * one turn means that one player starts it and he then ends it
   * a turn can have more than one actions from a player
   */
  public playTurn(): void {
    const action: PlayerAction = this.currentPlayer.play(this);
    while (this.drawCards > 0) {
      this.currentPlayer.hand.push(this.drawStack.draw());
    }
    if (this.skip) {
      this.skip = false;
      this.endTurn();
    }
    if (action instanceof PlayCardAction) {
      // TODO: checks if the card can be played

      const index = this.currentPlayer.hand.indexOf(action.card, 0);
      if (index > -1) {
        this.currentPlayer.hand.splice(index, 1);
      }

      this.gameStack.addCard(action.card);
      action.card.onPlay(this);
      this.logInfo(this.currentPlayer + " played a " + action.card);
      // check if this player has no more cards in his hand which means he won
      if (this.currentPlayer.hand.length === 0) {
        this.running = false;
        this.logInfo(this.currentPlayer + " won");
        this.currentPlayer.wins++;
        for (const player of this.players) {
          player.games++;
        }
        return;
      }

      if (this.currentPlayer.hand.length === 1) {
        this.logInfo(this.currentPlayer + " UNO");
      }

      // it ends the turn
      this.logInfo(this.currentPlayer + " ended his turn");
      this.endTurn();
    } else {
      // if the player hasnt drawn a card yet
      if (!this.drewCard) {
        // check if there are cards in the draw stack
        if (this.getDrawStackSize() === 0) {
          this.gameStack.addCardsToDrawStack(this.drawStack, true);
        }
        // the player draws a card from the draw stack
        this.currentPlayer.hand.push(this.drawStack.draw());
        this.drewCard = true;
        this.logInfo(this.currentPlayer + " drew a card "
        + this.currentPlayer.hand[this.currentPlayer.hand.length - 1]);
        this.playTurn();
      } else {
        this.logInfo(this.currentPlayer + " ended his turn");
        this.endTurn();
      }
    }
  }

  public get playerStatistic(): string {
    let output: string = "";
    for (const player of this.players) {
      output = output + player.playerName + " Games: " + player.games + " Wins: " + player.wins + "\n";
    }
    return output;
  }

  public printPlayerStatistic(): void {
    this.logInfo(this.playerStatistic);
  }

  public skipPlayer(): void {
    this.skip = true;
  }
  /**
   * get the current player
   */
  private get currentPlayer(): Player {
    return this.players[this.activePlayerIndex];
  }

  /**
   * log some information
   * @param text the text to log
   */
  private logInfo(text: string): void {
    if (this.logger !== null) {
      this.logger.info(text);
    }
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
