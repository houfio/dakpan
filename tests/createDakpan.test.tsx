import * as React from 'react';
import { Component } from 'react';
import { fireEvent, render } from 'react-testing-library';

import { createDakpan } from '../src';

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

  const { asFragment } = render(
    <Provider>
      <Consumer>
        {({ hello }) => hello}
      </Consumer>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();

  actions.append('!');

  expect(asFragment()).toMatchSnapshot();
});

it('should update the store asynchronously', async () => {
  const { Provider, Consumer, actions, mockUpdate } = createMockDakpan();

  const { asFragment } = render(
    <Provider>
      <Consumer>
        {({ test }) => test}
      </Consumer>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();

  await actions.increment();

  expect(mockUpdate).toBeCalledWith(0);
  expect(asFragment()).toMatchSnapshot();
});

it('should update the store as event handler', () => {
  const { Provider, Consumer, actions } = createMockDakpan();

  const { asFragment, getByTestId } = render(
    <Provider>
      <Consumer>
        {({ hello }) => (
          <>
            <span>{hello}</span>
            <button data-testid="button" onClick={actions.append.e('!')}/>
          </>
        )}
      </Consumer>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();

  const button = getByTestId('button');
  fireEvent.click(button);

  expect(asFragment()).toMatchSnapshot();
});

it('should call an action with the correct parameters', () => {
  const { Provider, actions, mockAction } = createMockDakpan();

  render(
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

  render(
    <Provider>
      <div/>
    </Provider>
  );

  expect(actions.error.e()).toThrow('Actions may only return objects');
});

it('should pass the actions to the consumer', () => {
  const { Provider, Consumer } = createMockDakpan();

  const { asFragment, getByTestId } = render(
    <Provider>
      <Consumer>
        {({ hello }, { append }) => (
          <>
            <span>{hello}</span>
            <button data-testid="button" onClick={append.e('!')}/>
          </>
        )}
      </Consumer>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();

  const button = getByTestId('button');
  fireEvent.click(button);

  expect(asFragment()).toMatchSnapshot();
});

it('should return the updated state', async () => {
  const { Provider, actions } = createMockDakpan();

  render(
    <Provider>
      <div/>
    </Provider>
  );

  expect(actions.append('!')).toMatchSnapshot();
  expect(await actions.increment()).toMatchSnapshot();
});

it('should pass the state to a stateless component using a hoc', () => {
  const { Provider, withConsumer } = createMockDakpan();

  type Test = {
    test: string
  };

  const Component = withConsumer(({ hello }, { append }) => ({
    hello,
    append
  }))<Test>(({ test, hello, append }) => (
    <>
      <span>{test}</span>
      <span>{hello}</span>
      <button onClick={append.e('!')}/>
    </>
  ));

  const { asFragment } = render(
    <Provider>
      <Component test="prop"/>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});

it('should pass the state to a stateful component using a hoc', () => {
  const { Provider, actions, withConsumer } = createMockDakpan();

  type Props = {
    test: string,
    hello: string,
    append: typeof actions.append
  };

  const TestComponent = withConsumer(({ hello }, { append }) => ({
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

  const { asFragment } = render(
    <Provider>
      <TestComponent test="prop"/>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
