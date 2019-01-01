import { Card } from "../cards/card";
import { PlayerAction } from "./playerAction";

/**
 * pass, e.g. the current Player will draw 1 Card from the
 * playstack and the he will end their turn
 */
export class PlayCardAction extends PlayerAction {
  constructor(public card: Card) {
    super();
  }
}
