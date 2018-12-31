import { Game } from "./game";
import { BasicPlayer } from "./players/basicPlayer";
import { PassingPlayer } from "./players/passingPlayer";
import { Player } from "./players/player";

test("cards get handed out correctly: correct amount of cards in drawStack", () => {
    // adds an array with 4 basicplayers
    const players: Player[] = [new BasicPlayer(), new BasicPlayer(), new BasicPlayer(), new BasicPlayer()];
    // creates a new game
    const game: Game = new Game(players, false);
    // it should hand out 7 cards to each player meaning 7*4 = 28 cards are removed from the drawStack
    expect(game.getDrawStackSize()).toBe(52);
});

test("cards get handed out correctly: correct amount of cards in player Hand", () => {
    // adds an array with 4 basicplayers
    const players: Player[] = [new BasicPlayer(), new BasicPlayer(), new BasicPlayer(), new BasicPlayer()];
    // creates a new game
    const game: Game = new Game(players, false);
    // it should hand out 7 cards to each player
    expect(game.players[0].hand.length).toBe(7);
});

test("initialization hands out the cards correctly: correct amount of cards in drawStack", () => {
    // adds an array with 4 basicplayers
    const players: Player[] = [new BasicPlayer(), new BasicPlayer(), new BasicPlayer(), new BasicPlayer()];
    // creates a new game
    const game: Game = new Game(players, false);
    game.restartGame(false);
    // it should hand out 7 cards to each player
    expect(game.getDrawStackSize()).toBe(52);
});

test("initialization hands out the cards correctly: correct amount of cards in player Hand", () => {
    // adds an array with 4 basicplayers
    const players: Player[] = [new BasicPlayer(), new BasicPlayer(), new BasicPlayer(), new BasicPlayer()];
    // creates a new game
    const game: Game = new Game(players, false);
    game.restartGame(false);
    // it should hand out 7 cards to each player
    expect(game.players[0].hand.length).toBe(7);
});

test("basic player draws cards correctly", () => {
    // adds an array with 4 basicplayers
    const players: Player[] = [new PassingPlayer()];
    // creates a new game
    const game: Game = new Game(players, false);
    // it lets the player play one turn
    // the basic bot allways passes which means that he draws a card
    game.playTurn();
    // it should hand out 7 cards to each player
    expect(game.players[0].hand.length).toBe(8);
});

test("basic player draws cards correctly after multiple turns", () => {
    // adds an array with 4 basicplayers
    const players: Player[] = [new PassingPlayer()];
    // creates a new game
    const game: Game = new Game(players, false);
    // it lets the player play one turn
    // the basic bot allways passes which means that he draws a card
    // we let it run for 5 turns which makes the basic player draw 5 cards
    for (let i: number = 1; i <= 5; i++) {
        game.playTurn();
    }
    // it should hand out 7 cards to each player
    expect(game.players[0].hand.length).toBe(12);
});
