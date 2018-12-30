import { Game } from "../game";
import { PlayerAction } from "./playerAction";

export class PassAction extends PlayerAction {
    /**
     * The current Player will draw 1 Card from the playstack and the he will end his Turn
     */
    public action(game: Game): void {
        game.endTurn();
    }
}
