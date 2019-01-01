import { Game } from "../game";
import { Card } from "./card";
import { Color } from "./color";

export class DirectionCard extends Card {
  constructor(public color: Color) {
    super();
  }

  public isPlayable(topCard: Card): boolean {
    if (!(topCard instanceof Card)) {
      return false;
    }

    const castedCard = topCard as Card;
    return this.color === castedCard.color ||
      topCard instanceof DirectionCard;
  }

  public toString(): string {
    return Color[this.color] + " Direction Card";
  }

  public onPlay(game: Game): void {
    game.switchDirection();
  }
}
