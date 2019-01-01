import { Card } from "./card";
import { Color } from "./color";
import { Value } from "./value";

/**
 * a basic card with a number and a color
 * the name "Value" is used because "Number" is reserved
 */
export class NumberCard extends Card {
  constructor(public color: Color, public value: Value) {
    super();
  }

  public isPlayable(topCard: Card): boolean {
    if (!(topCard instanceof NumberCard)) {
      return false;
    }

    const castedCard = topCard as NumberCard;
    return this.color === castedCard.color ||
      this.value === castedCard.value;
  }

  public toString(): string {
    return " " + Color[this.color] + " " + this.value;
  }
}
