import {
  $,
  component$,
  useStylesScoped$,
  useContext,
  QwikMouseEvent,
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
      if (gameState.currentRow < 4) {
        gameState.board[gameState.currentColumn][gameState.currentRow] =
          element.innerHTML;
      }
      gameState.currentRow++;
    }
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
