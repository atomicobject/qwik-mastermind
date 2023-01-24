import { validateGuess } from "./validate";
import { createDOM } from "@builder.io/qwik/testing";
import { test, expect } from "vitest";

test(`when guess is correct`, async () => {
  const answer = ["r", "y", "g", "b"];
  const guess = ["r", "y", "g", "b"];

  const resultOne = validateGuess(guess, answer);
  expect(resultOne).toStrictEqual([4, 0]);
});

test(`when guess is all incorrect`, async () => {
  const answer = ["r", "y", "r", "b"];
  const guess = ["g", "g", "g", "g"];

  const resultOne = validateGuess(guess, answer);
  expect(resultOne).toStrictEqual([0, 0]);
});

test(`when guess is all the same color, and one is correct`, async () => {
  const answer = ["r", "y", "g", "b"];
  const guess = ["r", "r", "r", "r"];

  const resultOne = validateGuess(guess, answer);
  expect(resultOne).toStrictEqual([1, 0]);
});

test(`when guess is all the same color, but multiple are correct`, async () => {
  const answer = ["r", "y", "r", "b"];
  const guess = ["r", "r", "r", "r"];

  const resultOne = validateGuess(guess, answer);
  expect(resultOne).toStrictEqual([2, 0]);
});

test(`when guess is all misplaced`, async () => {
  const answer = ["r", "y", "r", "b"];
  const guess = ["y", "r", "b", "r"];

  const resultOne = validateGuess(guess, answer);
  expect(resultOne).toStrictEqual([0, 4]);
});

test(`when guess is partially correct and partially misplaced`, async () => {
  const answer = ["r", "y", "r", "b"];
  const guess = ["r", "y", "b", "r"];

  const resultOne = validateGuess(guess, answer);
  expect(resultOne).toStrictEqual([2, 2]);
});

test(`when guess has multiple misplaced of single correct color`, async () => {
  const answer = ["r", "y", "g", "b"];
  const guess = ["g", "r", "g", "r"];

  const resultOne = validateGuess(guess, answer);
  expect(resultOne).toStrictEqual([1, 1]);
});

test(`when answer is all same color`, async () => {
  const answer = ["r", "r", "r", "r"];
  const guess = ["g", "r", "g", "r"];

  const resultOne = validateGuess(guess, answer);
  expect(resultOne).toStrictEqual([2, 0]);
});
