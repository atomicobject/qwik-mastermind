import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { BoardColumn } from "../board-column/column";
import styles from "./board.css?inline";

export const GameBoard = component$(() => {
	useStylesScoped$(styles);

	const renderColumns = () => {
		const columns = [];
		for (let i = 0; i < 10; i++) {
			columns.push(<BoardColumn key={i} />);
		}
		return columns;
	};

	return <div class="board-container">{renderColumns()}</div>;
});
