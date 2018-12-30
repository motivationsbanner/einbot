import { Game } from "../game";

export abstract class Action {
    public abstract action(game: Game): void;
}
