import { Component, component$, useStylesScoped$ } from "@builder.io/qwik";
import { iEndModal } from "~/types/game-types";
import styles from "./end-modal.css?inline";

export const EndModal: Component<iEndModal> = component$(({ numGuesses }) => {
  useStylesScoped$(styles);
  return (
    <div>
      <p>YOU WIN!</p>
      <p id="win-message">Game won in {numGuesses} guesses</p>
      <button>play again</button>
    </div>
  );
});
