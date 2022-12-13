import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { GuessColumn } from "../guess-column/guess-column";
import styles from "./board.css?inline";

export const GameBoard = component$(() => {
	useStylesScoped$(styles);

	const renderGuessColumns = () => {
		const guessColumns = [];
		for (let i = 0; i < 10; i++) {
			guessColumns.push(<GuessColumn key={i} />);
		}
		return guessColumns;
	};

	return <div class="game-board">{renderGuessColumns()}</div>;
});
