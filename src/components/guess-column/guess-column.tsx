import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { GuessEntry } from "../guess-entry/guess-entry";
import styles from "./guess-column.css?inline";

export const GuessColumn = component$(() => {
	useStylesScoped$(styles);

	const guessEntries = [];
	for (let i = 0; i < 5; i++) {
		guessEntries.push(<GuessEntry key={i} />);
	}

	return <div class="guess-column">{guessEntries}</div>;
});
