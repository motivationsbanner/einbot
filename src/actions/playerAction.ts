import { Game } from "../games/games";
import { Action } from "./action";

export abstract class PlayerAction extends Action {
    public abstract action(game: Game): void;
}
