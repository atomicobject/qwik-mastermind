import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { GuessColumn } from "../guess-column/guess-column";
import styles from "./board.css?inline";

export const GameBoard = component$(() => {
  useStylesScoped$(styles);

  const store = useStore(
    {
      board: [
        ["r", "b", "g", "y", 2, 1],
        ["r", "b", "g", "y", 2, 1],
      ],
    },
    { recursive: true }
  );

  return (
    <div class="game-board">
      {store.board.map((column) => (
        <GuessColumn guessEntries={column} />
      ))}
    </div>
  );
});
