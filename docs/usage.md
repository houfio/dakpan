---
layout: default
---

# Usage

The entire api Dakpan exposes to the developer is just one function. Here you can find the arguments it expects, and what it returns.

---

### `createDakpan(initialState)(actions)`
> Creates a Dakpan provider and hook.

### Input

#### `initialState`
> Initial state of the provider. Either an object or a function returning one.

```tsx
{
  hello: 'world'
}
```
```tsx
() => ({
  hello: 'world'
})
```

#### `actions`
> Object with actions to register to the Dakpan state. The first function takes all input parameters, and returns another function which receives the current state. The second function should return a new state object, or `undefined` when no state update should happen.

```tsx
{
  append: (append: string) => ({ hello }) => ({
    hello: hello + append
  })
}
```

### Output
> The output of the `createDakpan` function is an array containing the following items:

#### `Provider`
> The context provider. This component should wrap all components using the Dakpan hook.

```tsx
<Provider>
  /** children */
</Provider>
```

#### `useDakpan`
> The hook which provides access to the state and actions of the Dakpan instance. All actions return a `Promise<void>`.

```tsx
const [state, actions] = useDakpan();
```
