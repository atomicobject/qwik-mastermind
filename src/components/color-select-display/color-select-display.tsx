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
      if (gameState.lastEnteredRow < 3) {
        gameState.lastEnteredRow++;
        gameState.board[gameState.currentColumn][gameState.lastEnteredRow] =
          element.innerHTML;
      }

      console.log("select color: ", gameState.lastEnteredRow);
    }
  );

  const removeEntry = $(
    (
      event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
      element: Element
    ) => {
      gameState.board[gameState.currentColumn][gameState.lastEnteredRow] = "";
      if (gameState.lastEnteredRow > -1) {
        gameState.lastEnteredRow--;
      }
      console.log(gameState.lastEnteredRow);
    }
  );
  const validateGuess = $(
    (
      event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
      element: Element
    ) => {
      if (gameState.lastEnteredRow === 3) {
        gameState.currentColumn++;
        gameState.lastEnteredRow = -1;
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
          if (gameState.lastEnteredRow < 3) {
            gameState.lastEnteredRow++;
            gameState.board[gameState.currentColumn][gameState.lastEnteredRow] =
              key.toUpperCase();
          }

          break;
        case "Backspace":
          gameState.board[gameState.currentColumn][gameState.lastEnteredRow] =
            "";
          if (gameState.lastEnteredRow > -1) {
            gameState.lastEnteredRow--;
          }
          break;
        case "Enter":
          if (gameState.lastEnteredRow === 3) {
            gameState.currentColumn++;
            gameState.lastEnteredRow = -1;
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
          <button
            type="button"
            class="color-select-square"
            onClick$={selectColor}
          >
            {letter}
          </button>
        );
      })}
      <div class="entry-controls">
        <button class="control entry" onClick$={validateGuess}>
          Enter
        </button>
        <button class="control delete" onClick$={removeEntry}>
          Delete
        </button>
      </div>
    </div>
  );
});
