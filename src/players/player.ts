import { PlayerAction } from "../actions/playerAction";
import { Card } from "../cards/card";
import { Game } from "../game";

export abstract class Player {
  public hand: Card[] = [];
  public wins: number = 0;
  public games: number = 0;
  constructor(private name: string) {
  }
  /**
   * this Function is used to make the player do stuff
   * @param game give the current game as a parameter
   */
  public abstract play(game: Game): PlayerAction;

  public get playerName(): string {
    return this.name;
  }

  public toString(): string {
    return this.playerName + " hand: " + this.hand;
  }
}
