import React from 'react';

import { withCounter } from '../states/counter';

export const Counter = withCounter((state, actions) => ({ ...state, actions }))(({ count, actions }) => {
  return (
    <>
      Clicked {count} times
      <div>
        <button onClick={actions.decrement}>-</button>
        <button onClick={actions.increment}>+</button>
        <button onClick={actions.incrementIfOdd}>+ if odd</button>
        <button onClick={actions.incrementAsync.c(1000)}>+ async</button>
      </div>
    </>
  );
});
