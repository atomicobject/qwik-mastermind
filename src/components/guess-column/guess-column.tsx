import { Component, component$, useStylesScoped$ } from "@builder.io/qwik";
import { GuessEntry } from "../guess-entry/guess-entry";
import styles from "./guess-column.css?inline";
import { iGuessColumn } from "~/types/game-types";
import { GuessValidator } from "../guess-validator/guess-validator";

export const GuessColumn: Component<iGuessColumn> = component$(
  ({ guessEntries, index }) => {
    useStylesScoped$(styles);

    const entryData = guessEntries.slice(0, guessEntries.length - 2);
    const validationData = guessEntries.slice(-2);

    return (
      <div class="guess-column">
        {entryData.map((entry, entryIndex) => {
          return (
            <GuessEntry
              key={"column " + index + " entry " + entryIndex}
              guess={entry}
            />
          );
        })}
        <GuessValidator data={validationData as number[]} />
      </div>
    );
  }
);
