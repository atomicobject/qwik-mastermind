// File: src/routes/board/validate.ts
import type { RequestHandler } from '@builder.io/qwik-city';

type GuessValidation = Array<Number>;

const winningAnswer = ['r', 'g', 'b', 'y'];

export const validateGuess = (guessArray: Array<String>): GuessValidation => {
    let numCorrect: number = 0;
    let numMisplaced: number = 0;
    let numIncorrect: number = 0;

    guessArray.forEach((g, i) => {
        if (g[i] === winningAnswer[i]) {
            numCorrect++;
        }
        else if (winningAnswer.includes(g[i])) {
            numMisplaced++;
        }
        else numIncorrect++;
    })
    return [numCorrect, numMisplaced, numIncorrect];
}

export const onPost: RequestHandler<Promise<GuessValidation>> = async ({ request }) => { 
    return validateGuess(await request.json());
}