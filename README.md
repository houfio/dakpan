![Logo](https://raw.githubusercontent.com/houfio/dakpan/master/logo.svg?sanitize=true)
[![npm](https://badgen.net/npm/v/dakpan)](https://www.npmjs.com/package/dakpan)
[![minzipped size](https://badgen.net/bundlephobia/minzip/dakpan)](https://www.npmjs.com/package/dakpan)
[![license](https://badgen.net/npm/license/dakpan)](./LICENSE.md)
---

A tiny React state management library using hooks.

```tsx
const [StateProvider, useDakpan, withDakpan] = createDakpan({
  hello: 'world'
})({
  append: (value: string) => ({ hello }) => ({
    hello: hello + value
  })
});
```

## Installation

```
npm install dakpan
```
or
```
yarn add dakpan
```

## Documentation

You can find the documentation [here](https://dakpan.houf.io/).
