import { Color } from "../cards/color";
import { NumberCard } from "../cards/numberCard";
import { Value } from "../cards/value";
import { DrawStack } from "./drawStack";
import { GameStack } from "./gameStack";

test("cards can get added", () => {
  const gameStack = new GameStack();
  const card = new NumberCard(Color.RED, Value.NINE);
  const topCard = new NumberCard(Color.BLUE, Value.NINE);
  gameStack.initialize(topCard);

  expect(() => gameStack.addCard(card)).not.toThrow();
  expect(gameStack.length).toBe(2);
});

test("adding unplayable cards throws an exception", () => {
  const gameStack = new GameStack();
  const card = new NumberCard(Color.RED, Value.FIVE);
  const topCard = new NumberCard(Color.BLUE, Value.NINE);
  gameStack.initialize(topCard);

  expect(() => gameStack.addCard(card)).toThrow();
  expect(gameStack.length).toBe(1);
});

test("the gameStack can get shuffled back into the drawStack", () => {
  const drawStack = new DrawStack();
  const gameStack = new GameStack();
  const topCard = new NumberCard(Color.BLUE, Value.NINE);
  gameStack.initialize(topCard);

  for (let i = 0; i < 10; i++) {
    gameStack.addCard(new NumberCard(Color.BLUE, Value.THREE));
  }

  expect(gameStack.length).toBe(11);
  const drawStackLength = drawStack.length;

  gameStack.addCardsToDrawStack(drawStack);
  expect(gameStack.length).toBe(1);
  expect(drawStack.length).toBe(drawStackLength + 10);
  expect((gameStack.topCard as NumberCard).value).toBe(Value.THREE);
});
