import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./color-select-display.css?inline";
import { CmpButtonProps } from "../game-board/board";

export const ColorSelectDisplay = component$((props: CmpButtonProps) => {
  useStylesScoped$(styles);

  const qwerty = "QWERTY".split("");

  return (
    <div class="color-select-display">
      {qwerty.map((letter) => {
        return (
          <div class="color-select-square" onClick$={props.onClick$}>
            {letter}
          </div>
        );
      })}
    </div>
  );
});
