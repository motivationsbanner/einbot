import { Game } from "./game";
import { BasicPlayer } from "./players/basicPlayer";
import { Player } from "./players/player";

test("cards get handed out correctly: correct amount of cards in drawStack", () => {
    // adds an array with 4 basicplayers
    const players: Player[] = [new BasicPlayer(), new BasicPlayer(), new BasicPlayer(), new BasicPlayer()];
    // creates a new game
    const game: Game = new Game(players);
    // it should hand out 7 cards to each player meaning 7*4 = 28 cards are removed from the drawStack
    expect(game.getDrawStackSize()).toBe(52);
});

test("cards get handed out correctly: correct amount of cards in player Hand", () => {
    // adds an array with 4 basicplayers
    const players: Player[] = [new BasicPlayer(), new BasicPlayer(), new BasicPlayer(), new BasicPlayer()];
    // creates a new game
    const game: Game = new Game(players);
    // it should hand out 7 cards to each player
    expect(game.players[0].hand.length).toBe(7);
});

test("initialization hands out the cards correctly: correct amount of cards in drawStack", () => {
    // adds an array with 4 basicplayers
    const players: Player[] = [new BasicPlayer(), new BasicPlayer(), new BasicPlayer(), new BasicPlayer()];
    // creates a new game
    const game: Game = new Game(players);
    game.restartGame();
    // it should hand out 7 cards to each player
    expect(game.getDrawStackSize()).toBe(52);
});

test("initialization hands out the cards correctly: correct amount of cards in player Hand", () => {
    // adds an array with 4 basicplayers
    const players: Player[] = [new BasicPlayer(), new BasicPlayer(), new BasicPlayer(), new BasicPlayer()];
    // creates a new game
    const game: Game = new Game(players);
    game.restartGame();
    // it should hand out 7 cards to each player
    expect(game.players[0].hand.length).toBe(7);
});
