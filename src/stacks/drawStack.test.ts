import { Card } from "../cards/card";
import { DrawStack } from "./drawStack";

test("cards get generated", () => {
  const drawStack = new DrawStack();

  expect(drawStack.length).toBe(104);
});

test("cards can get drawn", () => {
  const drawStack = new DrawStack();

  expect(drawStack.draw()).toBeInstanceOf(Card);
});
