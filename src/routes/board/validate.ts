// File: src/routes/board/validate.ts
import type { RequestHandler } from "@builder.io/qwik-city";

type GuessValidation = Array<Number>;

const winningAnswerHardCoded = ["r", "g", "b", "y"];

export const validateGuess = (
  guessArray: Array<String>,
  winningAnswer: Array<String>
): GuessValidation => {
  let numCorrect = 0;
  let numAlmost = 0;

  const correctIndices: number[] = [];

  for (let i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === winningAnswer[i]) {
      correctIndices.push(i);
    }
  }

  numCorrect = correctIndices.length;

  let numRemoved = 0;
  for (const num of correctIndices) {
    guessArray.splice(num - numRemoved, 1);
    winningAnswer.splice(num - numRemoved, 1);
    numRemoved++;
  }

  for (const guess of guessArray) {
    if (winningAnswer.includes(guess)) {
      numAlmost++;
    }
  }

  return [numCorrect, numAlmost];
};

// jacob gave me this idea :P
export const validateGuessFiltering = (
  guessArray: Array<String>,
  winningAnswer: Array<String>
): GuessValidation => {
  const filteredAnswer = winningAnswer.filter(
    (letter, index) => letter !== guessArray[index]
  );

  const filteredGuess = guessArray.filter(
    (letter, index) => letter !== winningAnswer[index]
  );

  return [
    winningAnswer.length - filteredAnswer.length,
    filteredGuess.filter((letter) => filteredAnswer.includes(letter)).length,
  ];
};

export const onPost: RequestHandler<Promise<GuessValidation>> = async ({
  request,
}) => {
  return validateGuess(await request.json(), winningAnswerHardCoded);
};
