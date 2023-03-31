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
import { validateGuess } from "../../routes/board/validate";

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
    }
  );

  const removeEntry = $(
    (
      event?: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
      element?: Element
    ) => {
      if (gameState.lastEnteredRow > -1) {
        gameState.board[gameState.currentColumn][gameState.lastEnteredRow] = "";
        gameState.lastEnteredRow--;
      }
    }
  );
  const validate = $(
    (
      event?: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
      element?: Element
    ) => {
      if (gameState.lastEnteredRow === 3) {
        const score = validateGuess(
          gameState.board[gameState.currentColumn].slice(
            0,
            gameState.board[gameState.currentColumn].length - 2
          ) as string[],
          gameState.answer
        );
        // win state checking
        if (score[0] == 4) {
          gameState.win = true;
        }
        gameState.board[gameState.currentColumn][
          gameState.board[gameState.currentColumn].length - 2
        ] = score[0];
        gameState.board[gameState.currentColumn][
          gameState.board[gameState.currentColumn].length - 1
        ] = score[1];
        gameState.currentColumn++;
        gameState.lastEnteredRow = -1;
      }
    }
  );
  useOnDocument(
    "keydown",
    $((event) => {
      event.preventDefault();
      const key = (event as KeyboardEvent).key;
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
          removeEntry();
          break;
        case "Enter":
          validate();
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
            preventdefault:click
            type="button"
            class="color-select-square"
            onClick$={selectColor}
          >
            {letter}
          </button>
        );
      })}
      <div class="entry-controls">
        <button preventdefault:click class="control entry" onClick$={validate}>
          Enter
        </button>
        <button
          preventdefault:click
          class="control delete"
          onClick$={removeEntry}
        >
          Delete
        </button>
      </div>
    </div>
  );
});
