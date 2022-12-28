import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { ColorSelectDisplay } from "../color-select-display/color-select-display";
import { GuessColumn } from "../guess-column/guess-column";
import styles from "./board.css?inline";

export const GameBoard = component$(() => {
  useStylesScoped$(styles);

  const store = useStore(
    {
      board: [
        ["r", "b", "g", "y", 2, 1],
        ["g", "b", "y", "r", 2, 1],
        ["y", "r", "g", "b", 2, 1],
        ["y", "g", "r", "b", 2, 1],
        ["r", "y", "g", "b", 2, 1],
        ["g", "y", "b", "g", 3, 1],
        ["b", "r", "g", "y", 2, 1],
        ["y", "b", "g", "r", 2, 1],
        ["r", "b", "y", "g", 2, 2],
        ["b", "y", "g", "r", 2, 1],
      ],
    },
    { recursive: true }
  );

  return (
    <div class="game-container">
      <ColorSelectDisplay />
      <div class="game-board">
        {store.board.map((column, index) => (
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
