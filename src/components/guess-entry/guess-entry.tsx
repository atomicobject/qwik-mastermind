import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./guess-entry.css?inline";

export const GuessEntry = component$(() => {
	useStylesScoped$(styles);
	return <div class="guess-entry">guess entry</div>;
});
