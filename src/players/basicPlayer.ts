import { PassAction } from "../actions/passAction";
import { PlayerAction } from "../actions/playerAction";
import { Card } from "../cards/card";
import { Game } from "../game";
import { Player } from "./player";

export class BasicPlayer extends Player {
  /**
   * this Function is used to make the player do stuff
   * @param game give the current game as a parameter
   */
  public play(game: Game): PlayerAction {
    return new PassAction();
  }
}
