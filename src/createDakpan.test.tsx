import { mount } from 'enzyme';
import * as React from 'react';
import { Component } from 'react';

import { createDakpan } from './createDakpan';

const createMockDakpan = () => {
  const mockUpdate = jest.fn((current: number) => new Promise<number>((resolve) => resolve(current + 1)));
  const mockAction = jest.fn();

  return {
    ...createDakpan({
      hello: 'world',
      test: 0
    })({
      append: (append: string) => ({ hello }) => ({
        hello: `${hello}${append}`
      }),
      increment: () => async ({ test }) => ({
        test: await mockUpdate(test)
      }),
      mock: (test: string) => () => {
        mockAction(test);

        return {};
      },
      error: () => () => 'error' as any
    }),
    mockUpdate,
    mockAction
  };
};

it('should initialize the dakpan', () => {
  const { Provider, Consumer, actions } = createMockDakpan();

  expect(Provider).toBeDefined();
  expect(Consumer).toBeDefined();
  expect(actions).toBeDefined();
  expect(actions.append).toBeDefined();
});

it('should throw when an action is dispatched before its provider is mounted', () => {
  const { actions } = createMockDakpan();

  expect(actions.append.e('!')).toThrow('You may not dispatch an action before its provider is mounted');
});

it('should update the store', () => {
  const { Provider, Consumer, actions } = createMockDakpan();

  const wrapper = mount(
    <Provider>
      <Consumer>
        {({ hello }) => hello}
      </Consumer>
    </Provider>
  );

  expect(wrapper).toMatchSnapshot();

  actions.append('!');

  expect(wrapper.update()).toMatchSnapshot();
});

it('should update the store asynchronously', async () => {
  const { Provider, Consumer, actions, mockUpdate } = createMockDakpan();

  const wrapper = mount(
    <Provider>
      <Consumer>
        {({ test }) => test}
      </Consumer>
    </Provider>
  );

  expect(wrapper).toMatchSnapshot();

  await actions.increment();

  expect(mockUpdate).toBeCalledWith(0);
  expect(wrapper.update()).toMatchSnapshot();
});

it('should update the store as event handler', () => {
  const { Provider, Consumer, actions } = createMockDakpan();

  const wrapper = mount(
    <Provider>
      <Consumer>
        {({ hello }) => (
          <>
            <span>{hello}</span>
            <button onClick={actions.append.e('!')}/>
          </>
        )}
      </Consumer>
    </Provider>
  );

  expect(wrapper).toMatchSnapshot();
  wrapper.find('button').simulate('click');
  expect(wrapper).toMatchSnapshot();
});

it('should call an action with the correct parameters', () => {
  const { Provider, actions, mockAction } = createMockDakpan();

  mount(
    <Provider>
      <div/>
    </Provider>
  );

  actions.mock('hello!');
  const e = actions.mock.e('hello!!');

  expect(mockAction).toBeCalledWith('hello!');

  e();

  expect(mockAction).toBeCalledWith('hello!!');
});

it('should throw when the action doesn\'t return an object', () => {
  const { Provider, actions } = createMockDakpan();

  mount(
    <Provider>
      <div/>
    </Provider>
  );

  expect(actions.error.e()).toThrow('Actions may only return objects');
});

it('should pass the actions to the consumer', () => {
  const { Provider, Consumer } = createMockDakpan();

  const wrapper = mount(
    <Provider>
      <Consumer>
        {({ hello }, { append }) => (
          <>
            <span>{hello}</span>
            <button onClick={append.e('!')}/>
          </>
        )}
      </Consumer>
    </Provider>
  );

  expect(wrapper).toMatchSnapshot();
  wrapper.find('button').simulate('click');
  expect(wrapper).toMatchSnapshot();
});

it('should return the updated state', async () => {
  const { Provider, actions } = createMockDakpan();

  mount(
    <Provider>
      <div/>
    </Provider>
  );

  expect(actions.append('!')).toMatchSnapshot();
  expect(await actions.increment()).toMatchSnapshot();
});

it('should pass the state to a stateless component using a hoc', () => {
  const { Provider, withDakpan } = createMockDakpan();

  type Test = {
    test: string
  };

  const Component = withDakpan(({ hello }, { append }) => ({
    hello,
    append
  }))<Test>(({ test, hello, append }) => (
    <>
      <span>{test}</span>
      <span>{hello}</span>
      <button onClick={append.e('!')}/>
    </>
  ));

  const wrapper = mount(
    <Provider>
      <Component test="prop"/>
    </Provider>
  );

  expect(wrapper).toMatchSnapshot();
});

it('should pass the state to a stateful component using a hoc', () => {
  const { Provider, actions, withDakpan } = createMockDakpan();

  type Props = {
    test: string,
    hello: string,
    append: typeof actions.append
  };

  const TestComponent = withDakpan(({ hello }, { append }) => ({
    hello,
    append
  }))(class extends Component<Props> {
    public componentDidMount() {
      const { append } = this.props;

      append('!');
    }

    public render() {
      const { test, hello } = this.props;

      return (
        <>
          <span>{test}</span>
          <span>{hello}</span>
        </>
      );
    }
  });

  const wrapper = mount(
    <Provider>
      <TestComponent test="prop"/>
    </Provider>
  );

  expect(wrapper).toMatchSnapshot();
});
