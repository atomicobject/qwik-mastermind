import { Component, component$, useStylesScoped$ } from "@builder.io/qwik";
import { iValidator } from "~/types/game-types";
import styles from "./guess-validator.css?inline";

export const GuessValidator: Component<iValidator> = component$(({ data }) => {
	useStylesScoped$(styles);
	return <div class="guess-validator">
        {data.map((item) => {
          return <span>{item}</span>;
        })}
    </div>;
});