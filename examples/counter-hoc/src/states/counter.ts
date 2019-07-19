import { createDakpan } from 'dakpan';

import { sleep } from '../utils/sleep';

export const [CounterProvider,, withCounter] = createDakpan({
  count: 0
})({
  increment: () => ({ count }) => ({
    count: count + 1
  }),
  decrement: () => ({ count }) => ({
    count: count - 1
  }),
  incrementIfOdd: () => ({ count }) => {
    if (count % 2 !== 0) {
      return {
        count: count + 1
      };
    }
  },
  incrementAsync: (timeout: number) => async ({ count }) => {
    await sleep(timeout);

    return {
      count: count + 1
    };
  }
});
