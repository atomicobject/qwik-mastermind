import { validateGuess } from "./validate";
import { createDOM } from "@builder.io/qwik/testing";
import { test, expect } from "vitest";

test(`validateGuess should return correct validation value`, async () => {
  const answerOne = ["r", "y", "r", "b"];
  const guessOne = ["r", "r", "r", "r"];

  const resultOne = validateGuess(guessOne, answerOne);
  expect(resultOne).toStrictEqual([2, 0]);
});

// test(`[ExampleTest Component]: Should render 💣`, async () => {
//   const { screen, render } = await createDOM();
//   await render(<ExampleTest flag={false} />);
//   expect(screen.outerHTML).toContain("💣");
// });

// test(`[ExampleTest Component]: Click counter +1`, async () => {
//   const { screen, render, userEvent } = await createDOM();
//   await render(<ExampleTest flag={true} />);

//   expect(screen.outerHTML).toContain("Count:0");

//   const spanBefore = screen.querySelector("span") as HTMLDivElement;
//   await userEvent(".btn-counter", "click");
//   expect(spanBefore.innerHTML).toEqual("Count:1");

//   const spanAfter = screen.querySelector("span") as HTMLDivElement;
//   await userEvent("button", "click");
//   expect(spanAfter.innerHTML).toEqual("Count:2");
// });
