import { validateGuess } from "./validate";
import { test, expect } from "vitest";

test("validateGuess should return correct validation value", async () => {
  const answerOne = ["r", "y", "r", "b"];
  const guessOne = ["r", "r", "r", "r"];

  const resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([2, 0]);
});

test("validateGuess should return correct validation value", async () => {
  const answerOne = ["r", "y", "r", "b"];
  const guessOne = ["r", "b", "r", "y"];

  const resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([2, 2]);
});

test("validateGuess should return correct validation value", async () => {
  const answerOne = ["r", "y", "r", "b"];
  const guessOne = ["b", "r", "y", "r"];

  const resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([0, 4]);
});

test(`validateGuess should return correct validation value`, async () => {
  // guess is all the same color
  let answerOne = ["r", "y", "r", "b"];
  let guessOne = ["r", "r", "r", "r"];

  let resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([2, 0]);

  // answer is all the same color
  answerOne = ["r", "r", "r", "r"];
  guessOne = ["r", "y", "r", "b"];

  resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([2, 0]);

  // combination correct, misplaced, and incorrect
  answerOne = ["r", "y", "r", "b"];
  guessOne = ["r", "b", "r", "g"];

  resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([2, 1]);

  // all misplaced
  answerOne = ["r", "y", "r", "b"];
  guessOne = ["y", "r", "b", "r"];

  resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([0, 4]);

  // guess is all wrong
  answerOne = ["r", "y", "r", "b"];
  guessOne = ["g", "g", "g", "g"];

  resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([0, 0]);

  // multiple misplaced for a single correct color
  answerOne = ["r", "y", "g", "b"];
  guessOne = ["g", "r", "g", "r"];

  resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([1, 1]);

  // one misplaced for multiple correct color
  answerOne = ["r", "y", "r", "b"];
  guessOne = ["g", "r", "g", "y"];

  resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([0, 2]);

  // all correct
  answerOne = ["r", "r", "r", "r"];
  guessOne = ["r", "r", "r", "r"];

  resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([4, 0]);
});
