---
layout: default
---

# Installation

Dakpan is a library designed to make global and local state management easier than ever. It provides an easy and completely type-safe api for a great developer experience, and this all at under 1KB.

---

Installing is as easy as this:
```
npm i dakpan
```
Or, if you prefer Yarn instead:
```
yarn add dakpan
```
TypeScript types come bundled, so you don't have to install them separately.

---

You can find the examples [here](/examples.html), but here's a small one to get you started:
```tsx
const [StateProvider, useDakpan] = createDakpan({
  hello: 'world'
})({
  append: (append: string) => ({ hello }) => ({
    hello: hello + append
  })
});

// Requires a StateProvider higher up in the tree
function Component() {
  const [state, actions] = useDakpan();
  
  return (
    <>
      <span>Hello {state.hello}</span>
      <button onClick={actions.append.c('!')}>Add</button>
    </>
  )
}
```
