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

  const putColor = $((color: string) => {
    console.log("Putting Color", color);
    if (
      gameState.currentRow <= 3 &&
      !gameState.board[gameState.currentColumn][gameState.currentRow]
    ) {
      gameState.board[gameState.currentColumn][gameState.currentRow] = color;
    }
    if (gameState.currentRow < 3) {
      gameState.currentRow++;
    }
  });

  const selectColor = $(
    (
      event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
      element: Element
    ) => {
      putColor(element.innerHTML);
    }
  );

  const removeEntry = $(() => {
    if (
      gameState.currentRow > 0 &&
      gameState.board[gameState.currentColumn][gameState.currentRow] === ""
    ) {
      gameState.currentRow--;
    }
    gameState.board[gameState.currentColumn][gameState.currentRow] = "";
  });

  const validateGuess = $(() => {
    if (
      gameState.currentRow == 3 &&
      gameState.board[gameState.currentColumn][3] !== ""
    ) {
      console.log("call our validation logic");
      gameState.currentRow = 0;
      gameState.currentColumn++;
    }
  });
  useOnDocument(
    "keydown",
    $((event) => {
      const key = (event as KeyboardEvent).key;
      console.log("key: " + key);
      switch (key) {
        case "q" || "w" || "e" || "r" || "t" || "y":
          putColor(key.toUpperCase());
          break;
        case "Backspace":
          if (
            gameState.board[gameState.currentColumn][gameState.currentRow] ===
              "" &&
            gameState.currentRow > 0
          ) {
            gameState.currentRow--;
          }
          gameState.board[gameState.currentColumn][gameState.currentRow] = "";

          break;
        case "Enter":
          if (
            gameState.currentRow == 3 &&
            gameState.board[gameState.currentColumn][3] !== ""
          ) {
            validateGuess();
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
