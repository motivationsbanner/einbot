import { InvalidActionException } from "../actions/invalidActionException";
import { Card } from "../cards/card";
import { DrawStack } from "./drawStack";

/**
 * this stack contains the cards which got played
 */
export class GameStack {
  private cards: Card[] = [];

  public initialize(topCard: Card): void {
    this.cards = [topCard];
  }

  /**
   * add a card on top of the stack; an InvalidActionException gets
   * thrown if the card can not get played
   * @param card the card to add
   */
  public addCard(card: Card): void {
    if (this.cards === undefined || this.topCard === undefined) {
      throw new InvalidActionException("the gameStack didn't get initialized");
    }

    if (!card.isPlayable(this.topCard)) {
      throw new InvalidActionException(card + " can not get played on top of "
        + this.topCard);
    }

    this.cards.push(card);
  }

  /**
   * get the amount of cards in the stack
   */
  public get length(): number {
    return this.cards.length;
  }

  /**
   * get the top card
   */
  public get topCard(): Card {
    return this.cards[this.cards.length - 1];
  }

  /**
   * remove all cards but one and add them to a drawStack
   * and then shuffle the drawStack
   * @param drawStack the drawStacks to add the cards to
   * @param keepOneCard whether or to keep the top card on the stack
   */
  public addCardsToDrawStack(drawStack: DrawStack, keepOneCard: boolean = true): void {
    drawStack.addCardsToStack(this.cards.splice(0, this.length - (keepOneCard ? 1 : 0)));
    drawStack.shuffle();
  }
}
