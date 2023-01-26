<script>
export default {
  props: ["firstNumber", "operator", "secondNumber"],
};
</script>

<template>
  <div class="output">
    <!-- This messy output was because I wanted to show the previous number entered and operator in the correct order -->
    <div class="output-inner" v-show="this.operator">
      <h2 class="top-display" data-testid="top-output">
        {{ this.firstNumber }} {{ this.operator }}
      </h2>
    </div>
    <div class="output-inner" v-show="!this.operator">
      <h2 data-testid="answer-output">
        {{ this.firstNumber }}
      </h2>
    </div>
    <div class="output-inner" v-show="this.operator">
      <h2 data-testid="bottom-output">
        {{ this.secondNumber }}
      </h2>
    </div>
  </div>
</template>
