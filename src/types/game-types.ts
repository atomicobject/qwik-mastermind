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

// Define gameState
export interface GameState {
  board: (string | number)[][];
  currentColumn: number;
  lastEnteredRow: number;
}
