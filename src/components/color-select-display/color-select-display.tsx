import {
	$,
	component$,
	useStylesScoped$,
	useContext,
	QwikMouseEvent,
	useOnDocument,
} from "@builder.io/qwik";
import styles from "./color-select-display.css?inline";
import { MyContext } from "../game-board/board";
import { GameState } from "../../types/game-types";

export const ColorSelectDisplay = component$(() => {
	useStylesScoped$(styles);

	const gameState = useContext(MyContext) as GameState;

	const selectColor = $(
		(
			event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
			element: Element
		) => {
			if (gameState.lastEnteredRow < 3) {
				gameState.lastEnteredRow++;
				gameState.board[gameState.currentColumn][gameState.lastEnteredRow] =
					element.innerHTML;
			}
		}
	);

	const removeEntry = $(
		(
			event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
			element: Element
		) => {
			if (gameState.lastEnteredRow > -1) {
				gameState.board[gameState.currentColumn][gameState.lastEnteredRow] = "";
				gameState.lastEnteredRow--;
			}
		}
	);
	const validateGuess = $(
		(
			event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
			element: Element
		) => {
			if (gameState.lastEnteredRow === 3) {
				gameState.currentColumn++;
				gameState.lastEnteredRow = -1;
			}
		}
	);
	useOnDocument(
		"keydown",
		$((event) => {
			event.preventDefault();
			const key = (event as KeyboardEvent).key;
			switch (key) {
				case "q" || "w" || "e" || "r" || "t" || "y":
					if (gameState.lastEnteredRow < 3) {
						gameState.lastEnteredRow++;
						gameState.board[gameState.currentColumn][gameState.lastEnteredRow] =
							key.toUpperCase();
					}

					break;
				case "Backspace":
					if (gameState.lastEnteredRow > -1) {
						gameState.board[gameState.currentColumn][gameState.lastEnteredRow] =
							"";
						gameState.lastEnteredRow--;
					}
					break;
				case "Enter":
					if (gameState.lastEnteredRow === 3) {
						gameState.currentColumn++;
						gameState.lastEnteredRow = -1;
					}
					break;
			}
		})
	);

	const qwerty = "QWERTY".split("");

	return (
		<div class="color-select-display">
			{qwerty.map((letter) => {
				return (
					<button
						preventdefault:click
						type="button"
						class="color-select-square"
						onClick$={selectColor}
					>
						{letter}
					</button>
				);
			})}
			<div class="entry-controls">
				<button
					preventdefault:click
					class="control entry"
					onClick$={validateGuess}
				>
					Enter
				</button>
				<button
					preventdefault:click
					class="control delete"
					onClick$={removeEntry}
				>
					Delete
				</button>
			</div>
		</div>
	);
});
