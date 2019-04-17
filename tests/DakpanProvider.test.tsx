import * as React from 'react';
import { render } from 'react-testing-library';

import { createDakpan, DakpanProvider } from '../src';

it('should provide multiple dakpan states', () => {
  const { Provider: FirstProvider } = createDakpan({
    hello: 'world'
  })({
    append: (append: string) => ({ hello }) => ({
      hello: `${hello}${append}`
    })
  });

  const { Provider: SecondProvider, Consumer: SecondConsumer, actions: secondActions } = createDakpan({
    test: 0
  })({
    increment: () => ({ test }) => ({
      test: test + 1
    })
  });

  const { asFragment } = render(
    <DakpanProvider provide={[FirstProvider, SecondProvider]}>
      <SecondConsumer>
        {({ test }) => (
          <span>{test}</span>
        )}
      </SecondConsumer>
    </DakpanProvider>
  );

  expect(secondActions.increment).not.toThrow();
  expect(asFragment()).toMatchSnapshot();
});
