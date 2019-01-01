import { Game } from "./game";
import { GameBoard } from "./gui/gameBoard";
import { SimpleHTMLLogger } from "./loggers/simpleHTMLLogger";
import { BasicPlayer } from "./players/basicPlayer";
import { Player } from "./players/player";

// creates logger
const logger = new SimpleHTMLLogger(document.querySelector(".log"));

// adds an array with 1 passingPlayer
const players: Player[] = [
  new BasicPlayer("basicPlayer1"),
  new BasicPlayer("basicPlayer2"),
  new BasicPlayer("basicPlayer3"),
  new BasicPlayer("basicPlayer4"),
];

// creates a new game
const game: Game = new Game(players, logger);

// run 1000 games
logger.info("running 1000 games");
logger.mute();
for (let i: number = 0; i < 1000; i++) {
  game.startGame(true);
}
logger.unmute();

logger.info(game.playerStatistic);

// visualize a single game
logger.info("visualizing a game");
const gameBoard = new GameBoard(game, document.querySelector(".board"));
