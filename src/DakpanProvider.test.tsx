import { mount } from 'enzyme';
import * as React from 'react';

import { createDakpan } from './createDakpan';
import { DakpanProvider } from './DakpanProvider';

it('provides multiple dakpan states', () => {
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

  const wrapper = mount(
    <DakpanProvider provide={[FirstProvider, SecondProvider]}>
      <SecondConsumer>
        {({ test }) => (
          <span>{test}</span>
        )}
      </SecondConsumer>
    </DakpanProvider>
  );

  expect(secondActions.increment).not.toThrow();
  expect(wrapper.update()).toMatchSnapshot();
});
