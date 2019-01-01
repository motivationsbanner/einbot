import { Game } from "../game";
import { Color } from "./color";

/**
 * the base-class for all card-types
 */
export abstract class Card {
  public color: Color;
  /**
   * test whether a card can get played or not
   * @param topCard the card which is on top of the stack
   */
  public abstract isPlayable(topCard: Card): boolean;

  public toString(): string {
    return "Card";
  }

  public abstract onPlay(game: Game): void;
}
