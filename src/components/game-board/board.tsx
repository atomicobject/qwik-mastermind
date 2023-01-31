import {
  PropFunction,
  component$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { ColorSelectDisplay } from "../color-select-display/color-select-display";
import { GuessColumn } from "../guess-column/guess-column";
import styles from "./board.css?inline";

export interface CmpButtonProps {
  onClick$?: PropFunction<() => void>;
}

export const GameBoard = component$(() => {
  useStylesScoped$(styles);

  const gameState = useStore(
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
      currentRow: 0,
    },
    { recursive: true }
  );

  const selectColor = (e) => {
    gameState.board[gameState.currentColumn][gameState.currentRow] =
      e.target.val;

    gameState.currentRow++;
  };

  return (
    <div class="game-container">
      <ColorSelectDisplay onClick$={selectColor} />
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
  );
});
