import { Component, component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./guess-entry.css?inline";
import { iGuessEntry } from "~/types/game-types";

export const GuessEntry:Component<iGuessEntry> = component$(({guess}) => {
	useStylesScoped$(styles);
	return <div class="guess-entry">{guess}</div>;
});
