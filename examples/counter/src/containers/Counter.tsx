import React from 'react';

import { useCounter } from '../states/counter';

export function Counter() {
  const [counterState, counterActions] = useCounter();

  return (
    <>
      Clicked {counterState.count} times
      <div>
        <button onClick={counterActions.decrement}>-</button>
        <button onClick={counterActions.increment}>+</button>
        <button onClick={counterActions.incrementIfOdd}>+ if odd</button>
        <button onClick={counterActions.incrementAsync.c(1000)}>+ async</button>
      </div>
    </>
  );
}
