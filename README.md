# Dakpan [![npm version](https://badge.fury.io/js/dakpan.svg)](https://www.npmjs.com/package/dakpan)
A tiny React state management library using hooks.

## Installation
```
npm install dakpan
```
or
```
yarn add dakpan
```

## Examples
You can find the examples in the [`examples/`](https://github.com/houfio/dakpan/tree/master/examples) directory. Here's a smaller one to get your started:

```typescript jsx
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

## Documentation

### `createDakpan(initialState)(actions)`
Creates a Dakpan provider and hook.

### Input

#### `initialState`
Initial state of the provider. Either an object or a function returning one.
```typescript
{
  hello: 'world'
}
```
```typescript
() => ({
  hello: 'world'
})
```

#### `actions`
Object with actions to register to the Dakpan state. The first function takes all input parameters, and returns another function which receives the current state. The second function should return a new state object, or `undefined` when no state update should happen.
```typescript
{
  append: (append: string) => ({ hello }) => ({
    hello: hello + append
  })
}
```

### Output
The output of the `createDakpan` function is an array containing the following items:

#### `Provider`
The context provider. This component should wrap all components using the Dakpan hook.
```typescript jsx
<Provider>
  /** children */
</Provider>
```

#### `useDakpan`
The hook which provides access to the state and actions of the Dakpan instance. All actions return a `Promise<void>`.
```typescript
const [state, actions] = useDakpan();
```
