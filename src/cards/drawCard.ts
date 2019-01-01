import { Game } from "../game";
import { Card } from "./card";
import { Color } from "./color";

export class DrawCard extends Card {
  constructor(public color: Color) {
    super();
  }

  public isPlayable(topCard: Card): boolean {
    if (!(topCard instanceof Card)) {
      return false;
    }

    const castedCard = topCard as Card;
    return this.color === castedCard.color ||
      topCard instanceof DrawCard;
  }

  public toString(): string {
    return Color[this.color] + " Draw Card";
  }

  public onPlay(game: Game): void {
    game.addDrawCards(2);
  }
}
