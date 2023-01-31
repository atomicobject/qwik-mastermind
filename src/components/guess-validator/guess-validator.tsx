import { Component, component$, useStylesScoped$ } from "@builder.io/qwik";
import { iValidator } from "~/types/game-types";
import styles from "./guess-validator.css?inline";

export const GuessValidator: Component<iValidator> = component$(({ data }) => {
  useStylesScoped$(styles);

  const colorValue = ["incorrect", "incorrect", "incorrect", "incorrect"]
    .fill("correct", 0, data[0])
    .fill("almost", data[0], data[0] + data[1]);

  return (
    <div class="guess-validator">
      {colorValue.map((item) => {
        return <span class={"validator-square " + item}>{item}</span>;
      })}
    </div>
  );
});
