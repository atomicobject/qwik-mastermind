export interface iGuessColumn {
  guessEntries: (string | number)[];
  index: number;
}

export interface iGuessEntry {
  guess: string | number;
}

export interface iValidator {
  data: number[];
}
