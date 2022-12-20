import { Component, component$, useStylesScoped$ } from "@builder.io/qwik";
import { GuessEntry } from "../guess-entry/guess-entry";
import styles from "./guess-column.css?inline";
import { iGuessColumn } from "~/types/game-types";

export const GuessColumn: Component<iGuessColumn> = component$(
  ({ guessEntries }) => {
    useStylesScoped$(styles);

    return (
      <div class="guess-column">
        {guessEntries.map((entry) => {
          return <GuessEntry guess={entry} />;
        })}
      </div>
    );
  }
);
