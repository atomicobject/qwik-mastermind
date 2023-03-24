import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from "./end-modal.css?inline";

export const EndModal = component$(() => {
  useStylesScoped$(styles);
  return <div>YOU WIN!</div>
});