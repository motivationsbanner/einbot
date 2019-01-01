import { Game } from "./game";
import { Logger } from "./loggers/logger";
import { SimpleHTMLLogger } from "./loggers/simpleHTMLLogger";
import { PassingPlayer } from "./players/passingPlayer";
import { Player } from "./players/player";

// creates logger
const logger: Logger = new SimpleHTMLLogger(document.querySelector(".log"));
logger.info("Uno Game");

// adds an array with 1 passingPlayer
const players: Player[] = [new PassingPlayer("passingPlayer1")];

// creates a new game
const game: Game = new Game(players, logger);

// starts the game
game.startGame(false);

// does 10 turns
for (let i: number = 1; i <= 10; i++) {
  game.playTurn();
}
