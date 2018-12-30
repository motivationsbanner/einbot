import { Game } from "../games/games";

export abstract class Action {
    public abstract action(game: Game): void;
}
