<script>
import scientificButtonsImport from "./scientificButtons";
export default {
  props: {
    buttonArray: Array,
    onClick: Function,
  },

  methods: {
    setId(button) {
      const topRow = ["AC", "+/-", "%"];
      const rightRow = ["÷", "X", "-", "+", "="];
      if (topRow.includes(button)) {
        return "top-row-buttons";
      } else if (rightRow.includes(button)) {
        return "right-row-buttons";
      } else if (scientificButtonsImport.includes(button)) {
        return "sci-button";
      } else {
        return button;
      }
    },
  },
};
</script>

<template>
  <template v-for="(button, index) in buttonArray" :key="index">
    <button
      class="button"
      :id="this.setId(button)"
      @click="this.onClick(button)"
    >
      {{ button }}
    </button>
  </template>
</template>
