import { Game } from "./game";
import { PassingPlayer } from "./players/passingPlayer";
import { Player } from "./players/player";

document.body.appendChild(document.createTextNode("Uno Game"));
// adds an array with 1 passingPlayer
const players: Player[] = [new PassingPlayer("passingPlayer1")];
// creates a new game
const game: Game = new Game(players);
// starts the game and adds the log to the document
document.body.appendChild(document.createTextNode(game.startGame(false)));
for (let i: number = 1; i <= 5; i++) {
    document.body.appendChild(document.createTextNode(game.playTurn()));
}
