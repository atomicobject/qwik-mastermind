import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./square.css?inline";

export const Square = component$(() => {
	useStylesScoped$(styles);
	return <div class="square">square</div>;
});
