import { PassAction } from "../actions/passAction";
import { PlayCardAction } from "../actions/playCardAction";
import { PlayerAction } from "../actions/playerAction";
import { Card } from "../cards/card";
import { Game } from "../game";
import { Player } from "./player";
/**
 * the passing player allways passes which makes him usfull for test purposes
 */
export class PassingPlayer extends Player {
  /**
   * this Function is used to make the player do stuff
   * @param game give the current game as a parameter
   */
  public play(game: Game): PlayerAction {
    return new PassAction();
  }
}
