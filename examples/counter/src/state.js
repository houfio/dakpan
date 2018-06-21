import { createDakpan } from 'dakpan';

export const { Provider, Consumer } = createDakpan({
  value: 0
})({
  increment: () => ({ value }) => ({
    value: value + 1
  }),
  decrement: () => ({ value }) => ({
    value: value - 1
  }),
  incrementIfOdd: () => ({ value }) => ({
    value: value % 2 !== 0 ? value + 1 : value
  }),
  incrementAsync: () => ({ value }) => new Promise((resolve) => setTimeout(() => resolve({ value: value + 1 }), 1000))
});
