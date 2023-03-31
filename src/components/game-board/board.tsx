import {
  component$,
  useStore,
  useStylesScoped$,
  useContextProvider,
  createContext,
} from "@builder.io/qwik";
import { GameState } from "../../types/game-types";
import { ColorSelectDisplay } from "../color-select-display/color-select-display";
import { EndModal } from "../end-modal/end-modal";
import { GuessColumn } from "../guess-column/guess-column";
import styles from "./board.css?inline";

// Create a new context descriptor
export const MyContext = createContext("my-context");

export const GameBoard = component$(() => {
  useStylesScoped$(styles);

  const gameState: GameState = useStore(
    {
      board: [
        ["", "", "", "", 0, 0],
        ["", "", "", "", 0, 0],
        ["", "", "", "", 0, 0],
        ["", "", "", "", 0, 0],
        ["", "", "", "", 0, 0],
        ["", "", "", "", 0, 0],
        ["", "", "", "", 0, 0],
        ["", "", "", "", 0, 0],
        ["", "", "", "", 0, 0],
        ["", "", "", "", 0, 0],
      ],
      currentColumn: 0,
      lastEnteredRow: -1,
      answer: ["R", "R", "Q", "R"],
      win: false,
    },
    { recursive: true }
  );

  // Assign value (gameState) to the context (MyContext)
  useContextProvider(MyContext, gameState);
  return (
    <>
      {gameState.win && <EndModal numGuesses={gameState.currentColumn} />}
      <div class="game-container">
        <ColorSelectDisplay />
        <div class="game-board">
          {gameState.board.map((column, index) => (
            <GuessColumn
              key={"column " + index}
              guessEntries={column}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
});
