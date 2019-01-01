import { Game } from "./game";
import { Logger } from "./loggers/logger";
import { SimpleHTMLLogger } from "./loggers/simpleHTMLLogger";
import { BasicPlayer } from "./players/basicPlayer";
import { PassingPlayer } from "./players/passingPlayer";
import { Player } from "./players/player";

// creates logger
const logger: Logger = new SimpleHTMLLogger(document.querySelector(".log"));
logger.info("Uno Game");

// adds an array with 1 passingPlayer
const players: Player[] = [new BasicPlayer("basicPlayer1"),
new BasicPlayer("basicPlayer2"),
new BasicPlayer("basicPlayer3"),
new BasicPlayer("basicPlayer4"),
new PassingPlayer("passingPlayer1")];

// creates a new game
const game: Game = new Game(players, logger);

// starts the game
for (let i: number = 0; i < 1000; i++) {
  game.startGame(true);
}

game.printPlayerStatistic();
