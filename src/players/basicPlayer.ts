import { PassAction } from "../actions/passAction";
import { PlayCardAction } from "../actions/playCardAction";
import { PlayerAction } from "../actions/playerAction";
import { Game } from "../game";
import { Player } from "./player";
/**
 * the basicplayer allways plays the first card if he can else he passes
 */
export class BasicPlayer extends Player {
  /**
   * this Function is used to make the player do stuff
   * @param game give the current game as a parameter
   */
  public play(game: Game): PlayerAction {
    for (const card of this.hand) {
      // plays a card if he can
      if (card.isPlayable(game.topCard)) {
        return new PlayCardAction(card);
      }
    }
    return new PassAction();
  }
}
