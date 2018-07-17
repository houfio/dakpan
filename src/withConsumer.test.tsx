import { mount } from 'enzyme';
import * as React from 'react';

import { createDakpan } from './createDakpan';
import { DakpanProvider } from './DakpanProvider';
import { withDakpan } from './withDakpan';

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

  const wrapper = mount(
    <DakpanProvider provide={[FirstProvider, SecondProvider]}>
      <Component/>
    </DakpanProvider>
  );

  expect(wrapper).toMatchSnapshot();
});

it('should return the component when no hocs are specified', () => {
  const Component = withDakpan()(() => (
    <div/>
  ));

  const wrapper = mount(
    <Component/>
  );

  expect(wrapper).toMatchSnapshot();
});
