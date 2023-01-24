// File: src/routes/board/validate.ts
import type { RequestHandler } from "@builder.io/qwik-city";

type GuessValidation = Array<Number>;

const winningAnswerHardCoded = ["r", "g", "b", "y"];

// jacob gave me this idea :P
export const validateGuess = (
  guessArray: Array<String>,
  winningAnswer: Array<String>
): GuessValidation => {
  // filter out the correct answers and sort the array
  const sortedFilteredAnswer = winningAnswer
    .filter((letter, index) => letter !== guessArray[index])
    .sort();

  return [
    winningAnswer.length - sortedFilteredAnswer.length,
    // filter out the correct answers, sort it, then count the matching answers
    guessArray
      .filter((letter, index) => letter !== winningAnswer[index])
      .sort()
      .filter((letter, index) => letter === sortedFilteredAnswer[index]).length,
  ];
};

export const onPost: RequestHandler<Promise<GuessValidation>> = async ({
  request,
}) => {
  return validateGuess(await request.json(), winningAnswerHardCoded);
};
