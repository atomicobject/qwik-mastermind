import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./color-select-display.css?inline";

export const ColorSelectDisplay = component$(() => {
  useStylesScoped$(styles);

  const qwerty = "QWERTY".split("");

  return (
    <div class="color-select-display">
      {qwerty.map((letter) => {
        return <div class="color-select-square">{letter}</div>;
      })}
    </div>
  );
});
