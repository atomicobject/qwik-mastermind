// File: src/routes/board/validate.ts
import type { RequestHandler } from "@builder.io/qwik-city";

type GuessValidation = Array<Number>;

const winningAnswerHardCoded = ["r", "g", "b", "y"];

const getIndex = (value: String): number => {
  if (value === "r") {
    return 0;
  } else if (value === "y") {
    return 1;
  } else if (value === "g") {
    return 2;
  } else {
    return 3;
  }
};

const subtractArrays = (
  arrayOne: Array<number>,
  arrayTwo: Array<number>,
  negativesOmmitted?: boolean
): Array<number> => {
  return arrayOne.map(function (item, index) {
    // In this case item correspond to currentValue of array a,
    // using index to get value from array b
    const subtract = item - arrayTwo[index];
    if (subtract < 0 && negativesOmmitted) {
      return 0;
    }
    return subtract;
  });
};

export const validateGuess = (
  guessArray: Array<String>,
  winningAnswer: Array<String>
): GuessValidation => {
  const correctArray = [0, 0, 0, 0]; // completely correct
  const answerArray = [0, 0, 0, 0]; // winner
  const incorrectArray = [0, 0, 0, 0]; // not Correct, but possibly almost

  winningAnswer.forEach((g) => {
    // grab the color count from the true answer
    answerArray[getIndex(g)]++;
  });

  guessArray.forEach((g, i) => {
    // grab the color count for correct & incorrect
    if (g === winningAnswer[i]) {
      correctArray[getIndex(g)]++;
    } else {
      incorrectArray[getIndex(g)]++;
    }
  });

  const correctAnswers = correctArray.reduce((a, b) => a + b, 0); // sum of correct array is the number correct

  const remainingArray = subtractArrays(answerArray, correctArray); // the values the end user didn't guess
  const trulyIncorrectArray = subtractArrays(
    // the values that the end user got completely wrong
    remainingArray,
    incorrectArray,
    true
  );

  const incorrectAnswers = trulyIncorrectArray.reduce((a, b) => a + b, 0); // sum of incorrect
  const almostAnswers = 4 - incorrectAnswers - correctAnswers; // the ones we almost got is all that's left

  return [correctAnswers, almostAnswers]; // returning [correct, almost]
};

export const onPost: RequestHandler<Promise<GuessValidation>> = async ({
  request,
}) => {
  return validateGuess(await request.json(), winningAnswerHardCoded);
};
