// File: src/routes/board/validate.ts
import type { RequestHandler } from "@builder.io/qwik-city";

type GuessValidation = Array<Number>;
const winningAnswerHardCoded = ["r", "g", "b", "y"];

export const validateGuess = (
	guessArray: Array<String>,
	winningAnswer: Array<String>
): GuessValidation => {
	let numCorrect: number = 0;
	let numMisplaced: number = 0;

	let filteredAnswer = winningAnswer.filter(
		(letter, index) => letter !== guessArray[index]
	);
	let filteredGuess = guessArray.filter(
		(letter, index) => letter !== winningAnswer[index]
	);

	numCorrect = winningAnswer.length - filteredAnswer.length;

	for (let i = 0; i < filteredGuess.length; i++) {
		if (filteredAnswer.includes(filteredGuess[i])) {
			filteredAnswer.splice(filteredAnswer.indexOf(filteredGuess[i]), 1);
			numMisplaced++;
		}
	}
	return [numCorrect, numMisplaced];
};

export const onPost: RequestHandler<Promise<GuessValidation>> = async ({
	request,
}) => {
	return validateGuess(await request.json(), winningAnswerHardCoded);
};
