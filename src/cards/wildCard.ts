import { Game } from "../game";
import { Card } from "./card";
import { Color } from "./color";

export class WildCard extends Card {
  constructor(public color: Color = Color.BLUE) {
    super();
  }

  public isPlayable(topCard: Card): boolean {
    return true;
  }

  public toString(): string {
    return Color[this.color] + " Wild Card";
  }

  public onPlay(game: Game): void {
   return;
  }

  public setColor(color: Color): void {
    this.color = color;
   }
}
