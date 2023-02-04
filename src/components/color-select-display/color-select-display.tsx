import {
  $,
  component$,
  useStylesScoped$,
  useContext,
  QwikMouseEvent,
  useOnDocument,
} from "@builder.io/qwik";
import styles from "./color-select-display.css?inline";
import { MyContext } from "../game-board/board";
import { GameState } from "../../types/game-types";

export const ColorSelectDisplay = component$(() => {
  useStylesScoped$(styles);

  const gameState = useContext(MyContext) as GameState;

  const selectColor = $(
    (
      event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
      element: Element
    ) => {
      if (
        gameState.currentRow <= 3 &&
        !gameState.board[gameState.currentColumn][gameState.currentRow]
      ) {
        gameState.board[gameState.currentColumn][gameState.currentRow] =
          element.innerHTML;
      }
      if (gameState.currentRow < 3) {
        gameState.currentRow++;
      }
    }
  );

  useOnDocument(
    "keydown",
    $((event) => {
      const key = (event as KeyboardEvent).key;
      console.log("key: " + key);
      switch (key) {
        case "q":
        case "w":
        case "e":
        case "r":
        case "t":
        case "y":
          if (
            gameState.currentRow <= 3 &&
            !gameState.board[gameState.currentColumn][gameState.currentRow]
          ) {
            gameState.board[gameState.currentColumn][gameState.currentRow] =
              key.toUpperCase();
          }
          if (gameState.currentRow < 3) {
            gameState.currentRow++;
          }
          break;
        case "Backspace":
          gameState.board[gameState.currentColumn][gameState.currentRow] = "";
          if (gameState.currentRow > 0) {
            gameState.currentRow--;
          }
          break;
        case "Enter":
          if (gameState.currentRow == 3) {
            console.log("call our validation logic");
          }
          break;
      }
    })
  );

  const qwerty = "QWERTY".split("");

  return (
    <div class="color-select-display">
      {qwerty.map((letter) => {
        return (
          <button class="color-select-square" onClick$={selectColor}>
            {letter}
          </button>
        );
      })}
    </div>
  );
});
