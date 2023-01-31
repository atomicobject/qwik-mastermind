// File: src/routes/board/validate.ts
import type { RequestHandler } from "@builder.io/qwik-city";

type GuessValidation = Array<Number>;

const winningAnswerHardCoded = ["r", "g", "b", "y"];

// jacob gave me this idea :P
export const validateGuess = (
  guessArray: Array<String>,
  winningAnswer: Array<String>
): GuessValidation => {
  // filter out the correct answers
  const filteredAnswer = winningAnswer.filter(
    (letter, index) => letter !== guessArray[index]
  );

  return [
    winningAnswer.length - filteredAnswer.length,
    // filter out the correct answers, count matching guesses and remove from filtered answer
    // to ensure we get the correct count for misplaced guesses
    guessArray
      .filter((letter, index) => letter !== winningAnswer[index])
      .filter((letter) => {
        if (filteredAnswer.includes(letter)) {
          filteredAnswer.splice(filteredAnswer.indexOf(letter), 1);
          return true;
        }
        return false;
      }).length,
  ];
};

export const onPost: RequestHandler<Promise<GuessValidation>> = async ({
  request,
}) => {
  return validateGuess(await request.json(), winningAnswerHardCoded);
};
