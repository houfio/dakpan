---
layout: default
---

# Usage

The entire api Dakpan exposes to the developer is just one function. Here you can find the arguments it expects, and what it returns.

---

### `createDakpan(initialState?)(actions)`
> Creates a Dakpan provider and hook.

### Input

#### `initialState`
> Initial state of the provider. Either an object or a function returning one. When `undefined`, you have to supply the provider with an initial state.

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

#### `<Provider value?: object/>`
> The context provider. This component should wrap all components using the Dakpan hook. You can use the same provider multiple times in the same tree. Ony asks for a value when no initial value is given to `createDakpan`.

```tsx
<Provider>
  /** children */
</Provider>
```

#### `useDakpan(nullable?: boolean)`
> The hook which provides access to the state and actions of the Dakpan instance. All actions return a `Promise<void>`. The `nullable` parameter is optional, and if true indicates that the hook should NOT throw when it can't find a provider higher up in the tree.

```tsx
const [state, actions] = useDakpan();
```

#### `withDakpan(map: (state, actions) => object)(Component)`
> HOC which supplies your component with the Dakpan state and actions. The return value of the first parameter gets injected into the component.

```tsx
const WithState = withDakpan((state) => ({ test: state.test }))(({ test }) => (
  <div>
    {test}
  </div>
));
```
