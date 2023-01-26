import { expect, it, beforeEach, describe } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/vue";
import App from "../../App.vue";

describe("using calculator buttons as inputs", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should accurately perform '1+1'", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button1 = getByText("1");
    const buttonPlus = getByText("+");
    const buttonEquals = getByText("=");

    await fireEvent.click(button1);
    await fireEvent.click(buttonPlus);
    await fireEvent.click(button1);
    await fireEvent.click(buttonEquals);

    expect(output.innerText).toBe("2");
  });

  it("should accurately perform '10% ='", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button0 = getByText("0");
    const button1 = getByText("1");
    const buttonPercent = getByText("%");
    const buttonEquals = getByText("=");

    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(buttonPercent);
    await fireEvent.click(buttonEquals);

    expect(output.innerText).toBe("0.1");
  });

  it("should accurately perform '10%10 ='", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button0 = getByText("0");
    const button1 = getByText("1");
    const buttonPercent = getByText("%");
    const buttonEquals = getByText("=");

    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(buttonPercent);
    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(buttonEquals);

    expect(output.innerText).toBe("1");
  });

  it("should accurately perform '10%10% ='", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button0 = getByText("0");
    const button1 = getByText("1");
    const buttonPercent = getByText("%");

    const buttonEquals = getByText("=");

    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(buttonPercent);
    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(buttonPercent);
    await fireEvent.click(buttonEquals);

    expect(output.innerText).toBe("0.01");
  });

  it("should accurately perform '10+10x10 =' like an iPhone calculator ignoring order of operations", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button0 = getByText("0");
    const button1 = getByText("1");
    const buttonPlus = getByText("+");
    const buttonMultiply = getByText("X");

    const buttonEquals = getByText("=");

    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(buttonPlus);
    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(buttonEquals);

    expect(output.innerText).toBe("200");
  });

  it("should accurately perform '10 del'", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button0 = getByText("0");
    const button1 = getByText("1");
    const buttonDel = getByText("Del");

    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(buttonDel);

    expect(output.innerText).toBe("1");
  });

  it("should accurately perform '100 del'", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button0 = getByText("0");
    const button1 = getByText("1");
    const buttonDel = getByText("Del");

    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(button0);
    await fireEvent.click(buttonDel);

    expect(output.innerText).toBe("10");
  });

  it("should accurately perform '100 x del'", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button0 = getByText("0");
    const button1 = getByText("1");
    const buttonDel = getByText("Del");
    const buttonMultiply = getByText("X");

    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(button0);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(buttonDel);

    expect(output.innerText).toBe("100");
  });

  it("should accurately perform '100 x 1 del'", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("top-output");

    const button0 = getByText("0");
    const button1 = getByText("1");
    const buttonDel = getByText("Del");
    const buttonMultiply = getByText("X");

    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(button0);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button1);
    await fireEvent.click(buttonDel);

    expect(output.innerText).toBe("100 X");
  });

  it("should accurately perform '100 x 10 del'", async () => {
    const { getByText, getByTestId } = render(App);
    const topOutput = getByTestId("top-output");
    const output = getByTestId("bottom-output");

    const button0 = getByText("0");
    const button1 = getByText("1");
    const buttonDel = getByText("Del");
    const buttonMultiply = getByText("X");

    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(button0);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(buttonDel);

    expect(topOutput.innerText).toBe("100 X");
    expect(output.innerText).toBe("1");
  });

  it("should accurately perform '100 x 10 del del del del'", async () => {
    const { getByText, getByTestId } = render(App);
    const topOutput = getByTestId("top-output");
    const output = getByTestId("bottom-output");

    const button0 = getByText("0");
    const button1 = getByText("1");
    const buttonDel = getByText("Del");
    const buttonMultiply = getByText("X");

    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(button0);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button1);
    await fireEvent.click(button0);
    await fireEvent.click(buttonDel);
    expect(topOutput.innerText).toBe("100 X");
    expect(output.innerText).toBe("1");
    await fireEvent.click(buttonDel);
    expect(topOutput.innerText).toBe("100 X");
    expect(output.innerText).toBe("");
    await fireEvent.click(buttonDel);
    expect(topOutput.innerText).toBe("100 ");
    await fireEvent.click(buttonDel);
    expect(topOutput.innerText).toBe("10 ");
  });

  it("should accurately perform '8 x 8 ='", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button8 = getByText("8");
    const buttonEquals = getByText("=");
    const buttonMultiply = getByText("X");

    await fireEvent.click(button8);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button8);
    await fireEvent.click(buttonEquals);

    expect(output.innerText).toBe("64");
  });
  it("should not allow numbers to be added to a result", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button8 = getByText("8");
    const buttonEquals = getByText("=");
    const buttonMultiply = getByText("X");

    await fireEvent.click(button8);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button8);
    await fireEvent.click(buttonEquals);
    await fireEvent.click(button8);
    await fireEvent.click(button8);

    expect(output.innerText).toBe("88");
  });
  it("should allow further operations on a result", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button8 = getByText("8");
    const buttonEquals = getByText("=");
    const buttonMultiply = getByText("X");

    await fireEvent.click(button8);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button8);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button8);
    await fireEvent.click(buttonEquals);

    expect(output.innerText).toBe("512");
  });
  it("should handle float inputs", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button8 = getByText("8");
    const buttonPeriod = getByText(".");

    await fireEvent.click(button8);
    await fireEvent.click(buttonPeriod);
    await fireEvent.click(button8);

    expect(output.innerText).toBe("8.8");
  });

  it("should handle float calculations", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button8 = getByText("8");
    const buttonPeriod = getByText(".");
    const button5 = getByText("5");
    const buttonEquals = getByText("=");
    const buttonPlus = getByText("+");

    await fireEvent.click(button8);
    await fireEvent.click(buttonPeriod);
    await fireEvent.click(button5);
    await fireEvent.click(buttonPlus);
    await fireEvent.click(button5);
    await fireEvent.click(buttonEquals);

    expect(output.innerText).toBe("13.5");
  });
  it("should toggle negative and positive", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");
    const bottomOutput = getByTestId("bottom-output");

    const button8 = getByText("8");
    const buttonPeriod = getByText(".");
    const button5 = getByText("5");
    const buttonEquals = getByText("=");
    const buttonPlus = getByText("+");
    const buttonMultiply = getByText("X");
    const buttonToggleNegative = getByText("+/-");
    const buttonReset = getByText("AC");

    await fireEvent.click(button8);
    await fireEvent.click(buttonToggleNegative);
    expect(output.innerText).toBe("-8");

    await fireEvent.click(buttonReset);
    await fireEvent.click(button5);
    await fireEvent.click(buttonPlus);
    await fireEvent.click(button5);
    await fireEvent.click(buttonToggleNegative);
    expect(bottomOutput.innerText).toBe("-5");
    expect(output.innerText).toBe("5");

    await fireEvent.click(buttonReset);
    await fireEvent.click(button5);
    await fireEvent.click(buttonPeriod);
    await fireEvent.click(button8);
    await fireEvent.click(buttonToggleNegative);
    expect(output.innerText).toBe("-5.8");

    await fireEvent.click(buttonReset);
    await fireEvent.click(button5);
    await fireEvent.click(buttonPlus);
    await fireEvent.click(button5);
    await fireEvent.click(buttonToggleNegative);
    await fireEvent.click(buttonEquals);
    expect(output.innerText).toBe("0");

    await fireEvent.click(buttonReset);
    await fireEvent.click(button5);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button5);
    await fireEvent.click(buttonToggleNegative);
    await fireEvent.click(buttonEquals);
    expect(output.innerText).toBe("-25");

    await fireEvent.click(buttonReset);
    await fireEvent.click(button5);
    await fireEvent.click(buttonToggleNegative);
    expect(output.innerText).toBe("-5");

    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button5);
    await fireEvent.click(buttonToggleNegative);
    await fireEvent.click(buttonEquals);
    expect(output.innerText).toBe("25");

    await fireEvent.click(buttonReset);
    await fireEvent.click(button5);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button5);
    await fireEvent.click(buttonEquals);
    await fireEvent.click(buttonToggleNegative);
    expect(output.innerText).toBe("25");
  });
  it("should clear all", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button8 = getByText("8");
    const buttonPeriod = getByText(".");
    const button5 = getByText("5");
    const buttonEquals = getByText("=");
    const buttonPlus = getByText("+");
    const buttonReset = getByText("AC");

    await fireEvent.click(button8);
    await fireEvent.click(buttonPeriod);
    await fireEvent.click(button5);
    await fireEvent.click(buttonReset);
    expect(output.innerText).toBe("");

    await fireEvent.click(button8);
    await fireEvent.click(buttonPlus);
    await fireEvent.click(button5);
    await fireEvent.click(buttonReset);
    expect(output.innerText).toBe("");

    await fireEvent.click(button8);
    await fireEvent.click(buttonPlus);
    await fireEvent.click(button5);
    await fireEvent.click(buttonEquals);
    await fireEvent.click(buttonReset);
    expect(output.innerText).toBe("");
  });

  it("shouldn't allow double .", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button8 = getByText("8");
    const buttonPeriod = getByText(".");
    const button5 = getByText("5");
    const buttonReset = getByText("AC");

    await fireEvent.click(button8);
    await fireEvent.click(buttonPeriod);
    await fireEvent.click(button5);
    await fireEvent.click(buttonPeriod);
    expect(output.innerText).toBe("8.5");

    await fireEvent.click(buttonReset);
    await fireEvent.click(button8);
    await fireEvent.click(buttonPeriod);
    await fireEvent.click(buttonPeriod);
    await fireEvent.click(button5);
    expect(output.innerText).toBe("8.5");
  });
  it("should add commas to long numbers", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");
    const bottomOutput = getByTestId("bottom-output");

    const button8 = getByText("8");
    const buttonPeriod = getByText(".");
    const button5 = getByText("5");
    const buttonEquals = getByText("=");
    const buttonPlus = getByText("+");
    const buttonReset = getByText("AC");

    await fireEvent.click(button8);
    await fireEvent.click(button5);
    await fireEvent.click(button8);
    await fireEvent.click(button5);
    expect(output.innerText).toBe("8,585");

    await fireEvent.click(buttonPlus);
    await fireEvent.click(button5);
    await fireEvent.click(button5);
    await fireEvent.click(button5);
    await fireEvent.click(button5);
    expect(bottomOutput.innerText).toBe("5,555");

    await fireEvent.click(buttonEquals);
    expect(output.innerText).toBe("14,140");

    await fireEvent.click(buttonReset);
    await fireEvent.click(button5);
    await fireEvent.click(button5);
    await fireEvent.click(button8);
    await fireEvent.click(button5);
    await fireEvent.click(button5);
    await fireEvent.click(button5);
    await fireEvent.click(button5);
    expect(output.innerText).toBe("5,585,555");

    await fireEvent.click(buttonReset);
    await fireEvent.click(button5);
    await fireEvent.click(button5);
    await fireEvent.click(button8);
    await fireEvent.click(button5);
    await fireEvent.click(buttonPeriod);
    await fireEvent.click(button5);
    expect(output.innerText).toBe("5,585.5");
  });

  it("converts number to exponential", async () => {
    const { getByText, getByTestId } = render(App);
    const output = getByTestId("answer-output");

    const button9 = getByText("9");
    const buttonEquals = getByText("=");
    const buttonMultiply = getByText("X");

    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(buttonMultiply);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(button9);
    await fireEvent.click(buttonEquals);

    expect(output.innerText).toBe("1.0000e+18");
  });
});
