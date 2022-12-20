export interface iGuessColumn {
  guessEntries: (string | number)[];
}

export interface iGuessEntry {
  guess: string | number;
}

export interface iValidator {
  data: (string | number)[];
}
