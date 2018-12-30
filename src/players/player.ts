import { PlayerAction } from "../actions/playerAction";
import { Game } from "../game";
export abstract class Player {
    /**
     * This Function is used to make the player do stuff
     * @param game give the current Game as a Parameter
     */
    public abstract play(game: Game): PlayerAction;
}
