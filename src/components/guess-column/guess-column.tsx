import { Component, component$, useStylesScoped$ } from "@builder.io/qwik";
import { GuessEntry } from "../guess-entry/guess-entry";
import styles from "./guess-column.css?inline";
import { iGuessColumn } from "~/types/game-types";
import { GuessValidator } from "../guess-validator/guess-validator";

export const GuessColumn: Component<iGuessColumn> = component$(
  ({ guessEntries }) => {
    useStylesScoped$(styles);

	const entryData = guessEntries.slice(0, 4);
	const validationData = guessEntries.slice(-2);

    return (
      <div class="guess-column">
        {entryData.map((entry) => {
          return <GuessEntry guess={entry} />;
        })}
		<GuessValidator data={validationData} />
      </div>
    );
  }
);
