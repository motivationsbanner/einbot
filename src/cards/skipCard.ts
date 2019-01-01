import { Game } from "../game";
import { Card } from "./card";
import { Color } from "./color";

export class SkipCard extends Card {
  constructor(public color: Color) {
    super();
  }

  public isPlayable(topCard: Card): boolean {
    if (!(topCard instanceof Card)) {
      return false;
    }

    const castedCard = topCard as Card;
    return this.color === castedCard.color ||
      topCard instanceof SkipCard;
  }

  public toString(): string {
    return Color[this.color] + " Skip Card";
  }

  public onPlay(game: Game): void {
    game.skipPlayer();
  }
}
