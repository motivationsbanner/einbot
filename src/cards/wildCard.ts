import { Game } from "../game";
import { Card } from "./card";
import { Color } from "./color";
import { Value } from "./value";

/**
 * a basic card with a number and a color
 * the name "Value" is used because "Number" is reserved
 */
export class WildCard extends Card {
  constructor(public color: Color = Color.BLUE) {
    super();
  }

  public isPlayable(topCard: Card): boolean {
    return true;
  }

  public toString(): string {
    return " " + Color[this.color] + " Wild Card";
  }

  public onPlay(game: Game): void {
   return;
  }

  public setColor(color: Color): void {
    this.color = color;
   }
}
