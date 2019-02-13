import * as React from 'react';
import { create } from 'react-test-renderer';

import { createDakpan } from './createDakpan';

it('should work', async () => {
  const [Provider, useDakpan] = createDakpan({
    count: 2
  })({
    increase: (amount?: number) => async ({ count }) => ({
      count: count + (amount || 1)
    })
  });

  const Component = () => {
    const [state, actions] = useDakpan();

    return (
      <>
        {state.count}
        <button onClick={actions.increase.c(2)}>increase</button>
      </>
    );
  };

  const render = create(
    <Provider>
      <Component/>
    </Provider>
  );

  expect(render.toJSON()).toMatchSnapshot();
});
