import { PlayerAction } from "../actions/playerAction";
import { Game } from "../game";

export abstract class Player {
  /**
   * this Function is used to make the player do stuff
   * @param game give the current game as a parameter
   */
  public abstract play(game: Game): PlayerAction;
}
