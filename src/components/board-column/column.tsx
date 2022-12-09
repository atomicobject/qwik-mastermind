import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Square } from "../board-square/square";
import styles from "./column.css?inline";

export const BoardColumn = component$(() => {
	useStylesScoped$(styles);

	const squares = [];
	for (let i = 0; i < 5; i++) {
		squares.push(<Square key={i} />);
	}

	return <div class="column">{squares}</div>;
});
