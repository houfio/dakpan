# Dakpan [![npm version](https://badge.fury.io/js/dakpan.svg)](https://www.npmjs.com/package/dakpan)
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
          <button onClick={actions.append.e('!')}>Add</button>
        </>
      )}
    </Consumer>
  </Provider>
);
```

For more examples, see [`examples/`](https://github.com/houfio/dakpan/tree/master/examples).

## Documentation

## `createDakpan(initialState)(actions)`

Returns an object with a provider component, consumer component and a HOC.

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

A component that gives its child access to the state and actions.  
The `actions` object contains functions with the same names as in the `createDakpan` call, but they only take the parameters (and not the state). It returns the state if the action is synchronous, else it wraps in it a promise.  
Every action also contains a function called `e`, which returns a curried version of itself. That way you can avoid arrow functions in `render`.

```ts
<Consumer>
  {(state, actions) => /** children with access to the state and actions */}
</Consumer>
```

#### `withConsumer((state, actions) => object)(component)`

A function which returns a new component with the state and actions from the context (aka a HOC).

```ts
type Props = {
  test: string
};

const Component = withConsumer(({ hello }, { append }) => ({
  hello,
  append
}))<Props>(({ test, hello, append }) => (
  <>
    <span>{test}</span>
    <span>{hello}</span>
    <button onClick={append.e('!')}/>
  </>
));

<Component test="prop"/>
```

#### `context`

An object with the original `Provider` and `Consumer`.

## `<DakpanProvider provide/>`

A component that wraps all its children in specified providers.

```ts
<DakpanProvider provide={[Provider, AnotherProvider]}>
  <Consumer/>
<DakpanProvider/>
```

## `withDakpan(...withConsumer())(component)`

A function which wraps the component in specified HOCs.

```ts
const Component = withDakpan(withFirst(() => ({ first: '' })), withSecond(() => ({ second: '' })))(({ first, second }) => (
  /** component with access to `first` and `second` */
))
```
