import { Color } from "./color";
import { NumberCard } from "./number_card";
import { Value } from "./value";

test("card can be played if the top card has the same color", () => {
  const topCard = new NumberCard(Color.RED, Value.ONE);
  const newCard = new NumberCard(Color.RED, Value.TWO);

  expect(newCard.isPlayable(topCard)).toBe(true);
});

test("card can be played if the top card has the same value", () => {
  const topCard = new NumberCard(Color.RED, Value.ONE);
  const newCard = new NumberCard(Color.BLUE, Value.ONE);

  expect(newCard.isPlayable(topCard)).toBe(true);
});

test("card can not be played if the top card has a different color and number", () => {
  const topCard = new NumberCard(Color.RED, Value.ONE);
  const newCard = new NumberCard(Color.BLUE, Value.TWO);

  expect(newCard.isPlayable(topCard)).toBe(false);
});
