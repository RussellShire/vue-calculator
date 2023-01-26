<script>
import scientificButtonsImport from "./components/scientificButtons";
import OutputBox from "./components/outputBox.vue";
import ButtonGrid from "./components/buttonGrid.vue";
export default {
  components: {
    ButtonGrid,
    OutputBox,
  },

  mounted() {
    this.getScreenOrientation();

    window.addEventListener("resize", () => this.getScreenOrientation());

    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
  },

  beforeUnmount() {
    window.removeEventListener("resize", () => this.getScreenOrientation());

    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
  },

  data() {
    return {
      calculation: { firstNumber: "", operator: "", secondNumber: "" },
      inputState: "",
      isAnswer: false,
      isLandscape: false,
      buttons: ["%", "÷", 7, 8, 9, "X", 4, 5, 6, "-", 1, 2, 3, "+", ".", 0],
      scientificButtons: scientificButtonsImport,
      operations: ["%", "÷", "X", "-", "+"],
    };
  },

  methods: {
    stringToNumber(numberString) {
      return parseFloat(numberString.replaceAll(",", ""));
    },

    getScreenOrientation() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      width > height ? (this.isLandscape = true) : (this.isLandscape = false);
    },

    handleKeyUp(e) {
      if (
        this.buttons.includes(Number(e.key)) ||
        this.buttons.includes(e.key)
      ) {
        this.addToCalculation(e.key);
      }
      // console.log(e);

      // Handling unusual key presses
      if (e.key === "/") this.addToCalculation("÷");
      if (e.key === "x" || e.key === "*") this.addToCalculation("X");
      if (e.key === "=" || e.key === "Enter") this.calculate("");
      if (e.key === "Delete" || e.key === "Backspace") this.deleteLast();
      if (e.key === "Escape" || e.key === "c" || e.key === "C") this.clearAll();
    },

    setCalculationState(buttonPress) {
      if (
        !this.calculation.secondNumber &&
        !this.calculation.operator &&
        !this.operations.includes(buttonPress) &&
        !this.isAnswer
      ) {
        this.inputState = "firstNumber";
      } else if (this.operations.includes(buttonPress)) {
        this.inputState = "operator";
      } else {
        this.inputState = "secondNumber";
      }
    },

    addToCalculation(buttonPress) {
      this.setCalculationState(buttonPress);
      const inputState = this.inputState;
      const isNewCalculation =
        this.isAnswer &&
        !this.operations.includes(buttonPress) &&
        !this.calculation.operator;
      const isOperator = this.operations.includes(buttonPress);
      let currentInput = this.calculation[inputState];

      // Pressing a number after a calculation overwrites the answer and resets state
      if (isNewCalculation) {
        this.calculation.firstNumber = buttonPress.toString();
        this.isAnswer = false;
      }

      // Stopping an operator being first entry
      if (isOperator && !this.calculation.firstNumber) {
        return;
      }

      // allowing an operator to function as equals, so you can chain operations
      if (!isNewCalculation && isOperator && this.calculation.secondNumber) {
        this.isAnswer = false;
        this.calculate(buttonPress);
      }

      if (!isNewCalculation) {
        this.isAnswer = false;

        // Stop periods being entered at incorrect times
        if (
          (buttonPress === "." && currentInput.includes(".")) ||
          (buttonPress === "." && !currentInput)
        ) {
          return;
        }

        if (!isOperator) {
          currentInput = currentInput + buttonPress;

          // Adds in commas in long numbers
          if (buttonPress !== ".") {
            currentInput = this.stringToNumber(currentInput).toLocaleString();
          }
        } else {
          currentInput = buttonPress;
        }
        this.calculation[inputState] = currentInput;
      }
    },

    deleteLast() {
      // Moving back through inputState if whole input has been deleted
      if (
        !this.calculation[this.inputState] &&
        this.inputState !== "firstNumber"
      ) {
        const states = Object.keys(this.calculation);
        const previousState = states[states.indexOf(this.inputState) - 1];
        this.inputState = previousState;
      }

      let currentInput = this.calculation[this.inputState];

      if (!this.isAnswer) {
        currentInput = currentInput.slice(0, -1);

        // Adding commas back in
        if (currentInput) {
          currentInput = this.stringToNumber(currentInput).toLocaleString();
        }
      }

      this.calculation[this.inputState] = currentInput;
    },

    toggleNegativePositive() {
      let number = this.stringToNumber(this.calculation[this.inputState]);

      if (this.inputState !== "operator" && !this.isAnswer) {
        number = number * -1;
      }
      this.calculation[this.inputState] = number.toLocaleString();
    },

    clearAll() {
      this.calculation.firstNumber = "";
      this.calculation.secondNumber = "";
      this.calculation.operator = "";
      this.inputState = "";
      this.isAnswer = false;
    },

    calculate(buttonPress) {
      let num1 = this.stringToNumber(this.calculation.firstNumber);
      let num2 = this.calculation.secondNumber;

      // Allows you to enter '10% =' and get a result
      if (!num2 && this.calculation.operator === "%") {
        num2 = "1";
      }
      num2 = this.stringToNumber(num2);

      // stopping calling calculate on incomplete inputs
      if (!num1 || !num2) {
        return;
      }

      switch (this.calculation.operator) {
        case "%":
          num1 = (num1 / 100) * num2;
          break;
        case "X":
          num1 = num1 * num2;
          break;
        case "÷":
          num1 = num1 / num2;
          break;
        case "-":
          num1 = num1 - num2;
          break;
        case "+":
          num1 = num1 + num2;
          break;
      }
      num1 = num1.toLocaleString();

      if (num1.length > 11) {
        num1 = Number(num1.replaceAll(",", "")).toExponential(4);
      }

      this.calculation.firstNumber = num1;

      this.calculation.secondNumber = "";
      this.calculation.operator = buttonPress;
      // this.inputState = "firstNumber";
      this.isAnswer = true;
    },

    doNothing() {
      // Placeholder for scientific buttons
      return;
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="inner-container">
      <outputBox
        :first-number="calculation.firstNumber"
        :operator="calculation.operator"
        :second-number="calculation.secondNumber"
      />

      <div class="all-buttons-container">
        <div class="sci-button-grid" v-show="isLandscape">
          <button-grid
            :button-array="scientificButtons"
            :on-click="this.doNothing"
          />
        </div>

        <div class="button-grid">
          <button class="button" id="top-row-buttons" @click="clearAll">
            AC
          </button>
          <button
            class="button"
            id="top-row-buttons"
            @click="toggleNegativePositive"
          >
            +/-
          </button>

          <button-grid
            :button-array="buttons"
            :on-click="this.addToCalculation"
          />

          <button class="button" id="top-row-buttons" @click="deleteLast">
            Del
          </button>
          <button class="button" id="right-row-buttons" @click="calculate('')">
            =
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/*@import "./node_modules/normalize.css/normalize.css";*/
@import "./assets/styles/style.css";
</style>
