# vue-calculator

This template should help get you started developing with Vue 3 in Vite.

# Errors spotted

- 10%10% produces an error
- 10%x10 not currently possible - this might introduce errors of removing operations
- 10x10%10 shouldn't be possible
- 10x/ should evaluate to 10/ rather than stopping input at 10x
- multiple ... possible at the moment
- no output of what has just been calucated at the moment
- you can currently delete the numbers off the end of an answer

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
