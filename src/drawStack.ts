import { Card } from "./cards/card";
import { Color } from "./cards/color";
import { NumberCard } from "./cards/numberCard";
import { Value } from "./cards/value";

/**
 * this class represents the draw-stack
 */
export class DrawStack {
  private cards: Card[];

  constructor() {
    this.createCards();
    this.shuffle();
  }

  /**
   * draw the card on the top
   */
  public draw(): Card {
    return this.cards.pop();
  }

  /**
   * amount of cards in the stack
   */
  get length(): number {
    return this.cards.length;
  }

  /**
   * create the initial deck
   * this includes the following cards:
   * + 2 of every number-card
   */
  private createCards(): void {
    this.cards = [];

    for (let color = 0; color < 4; color++) {
      for (let value = 0; value < 10; value++) {
        for (let i = 0; i < 2; i++) {
          this.cards.push(new NumberCard(color as Color, value as Value));
        }
      }
    }
  }

  /**
   * shuffle the deck
   */
  private shuffle(): void {
    for (let i = 0; i < this.length; i++) {
      const ii = Math.floor(Math.random() * (this.length - 1 - i)) + i;
      [this.cards[i], this.cards[ii]] = [this.cards[ii], this.cards[i]];
    }
  }
}
