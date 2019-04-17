import * as React from 'react';
import { render } from 'react-testing-library';

import { createDakpan, DakpanProvider, withDakpan } from '../src';

it('should wrap the component with specified hocs', () => {
  const { Provider: FirstProvider, withConsumer: withFirst } = createDakpan({
    hello: 'world'
  })({});

  const { Provider: SecondProvider, withConsumer: withSecond } = createDakpan({
    test: 234
  })({});

  const Component = withDakpan(withFirst((state) => state), withSecond((state) => state))(({ hello, test }) => (
    <>
      {hello}
      {test}
    </>
  ));

  const { asFragment } = render(
    <DakpanProvider provide={[FirstProvider, SecondProvider]}>
      <Component/>
    </DakpanProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

it('should return the component when no hocs are specified', () => {
  const Component = withDakpan()(() => (
    <div/>
  ));

  const { asFragment } = render(
    <Component/>
  );

  expect(asFragment()).toMatchSnapshot();
});
