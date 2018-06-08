# Dakpan
A tiny React state management library using the new React context.

## Install
```
npm install dakpan
```
or
```
yarn add dakpan
```

## Example
```ts
import { createDakpan } from 'dakpan';

const { Provider, Consumer, actions } = createDakpan({
  hello: 'world'
})({
  append: (append: string) => ({ hello }) => ({
    hello: hello + append
  })
});

const Component = () => (
  <Provider>
    <Consumer>
      {({ hello }) => (
        <>
          <span>Hello {hello}</span>
          <button onClick={() => actions.append('!')}>Add</button>
        </>
      )}
    </Consumer>
  </Provider>
);
```

## Documentation

## `createDakpan(initialState)(actions)`

Returns an object with a provider component, consumer component and actions.

### Input:

#### `initialState`

The initial state of the provider.

```ts
{
  hello: 'world'
}
```

#### `actions`

An object with actions, of which the first function takes parameters and the second the current state. An action should always return updated state values, or an empty object.

```ts
{
  append: (append: string) => ({ hello }) => ({
    hello: hello + append
  })
}
```

### Output:

#### `Provider`

A component that should wrap all of the consumers. Without this component mounted, calling an action throws an error.

```ts
<Provider>
  /** children */
</Provider>
```

#### `Consumer`

A component that gives its child access to the state.

```ts
<Consumer>
  {(state) => /** children with access to the state */}
</Consumer>
```

#### `actions`

An object with the same keys as the input actions with functions that take the action parameters. Returns a promise when the action is asynchronous, otherwise returns void.

```ts
{
  append: (append: string) => void
}
```
