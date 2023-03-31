import { component$ } from "@builder.io/qwik";
import { GameBoard } from "~/components/game-board/board";

export const ANSWER_SET = ["Q", "W", "E", "R", "T", "Y"];

export default component$(() => {
	return <GameBoard />;
});
