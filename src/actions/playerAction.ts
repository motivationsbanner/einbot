import { Game } from "../game";
import { Action } from "./action";

export abstract class PlayerAction extends Action {
    public abstract action(game: Game): void;
}
