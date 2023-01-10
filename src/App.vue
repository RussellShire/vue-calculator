<script>
export default {
  data() {
    return {
      msg: "",
      buttons: ["%", "/", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "+", ".", 0],
    };
  },
  methods: {
    addToCalculation(button) {
      this.msg += button;
    },
  },
};
</script>

<template>
  <h1 class="output">{{ msg }}</h1>
  <div class="button-grid">
    <button class="operator button" @click="clear">AC</button>
    <button class="operator button" @click="toggleNegativePositive">
      (-/+)
    </button>

    <template v-for="button in buttons" :key="button.id">
      <button class="numbers button" @click="addToCalculation(button)">
        {{ button }}
      </button>
    </template>

    <button class="operator button" @click="deleteLast">Del</button>
    <button class="equals button" @click="calculate">=</button>
  </div>
</template>

<style>
:root {
  --size: 5rem;
}

header {
  line-height: 1.5;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(4, var(--size));
  grid-template-rows: minmax(var(--size), auto) repeat(5, var(--size));
  column-gap: 0.3rem;
  row-gap: 0.3rem;
}

.button {
  background-color: #abc8c7;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  transition: opacity 1s;
}

.equals {
  background-color: #b0a1ba;
}

.output {
  min-height: 3rem;
}

.button:focus {
  animation-name: clicked;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
}

@keyframes clicked {
  0% {
    opacity: 1;
  }
  30% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
