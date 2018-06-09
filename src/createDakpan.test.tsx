import { mount } from 'enzyme';
import * as React from 'react';

import { createDakpan } from './createDakpan';

const createMockDakpan = () => {
  const mockUpdate = jest.fn((current: number) => new Promise<number>((resolve) => resolve(current + 1)));
  const mockAction = jest.fn();

  return {
    dakpan: createDakpan({
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
  const { dakpan: { Provider, Consumer, actions } } = createMockDakpan();

  expect(Provider).toBeDefined();
  expect(Consumer).toBeDefined();
  expect(actions).toBeDefined();
  expect(actions.append).toBeDefined();
  expect(actions.increment).toBeDefined();
});

it('should throw when an action is dispatched before its provider is mounted', () => {
  const { dakpan: { actions } } = createMockDakpan();

  expect(actions.append.e('!')).toThrow('You may not dispatch an action before its provider is mounted');
});

it('should update the store', () => {
  const { dakpan: { Provider, Consumer, actions } } = createMockDakpan();

  const wrapper = mount(
    <Provider>
      <Consumer>
        {({ hello }) => hello}
      </Consumer>
    </Provider>
  );

  expect(wrapper).toMatchSnapshot();
  expect(actions.append('!')).toBe(undefined);
  expect(wrapper.update()).toMatchSnapshot();
});

it('should update the store asynchronously', async () => {
  const { dakpan: { Provider, Consumer, actions }, mockUpdate } = createMockDakpan();

  const wrapper = mount(
    <Provider>
      <Consumer>
        {({ test }) => test}
      </Consumer>
    </Provider>
  );

  expect(wrapper).toMatchSnapshot();
  expect(await actions.increment()).toBe(undefined);
  expect(mockUpdate).toBeCalledWith(0);
  expect(wrapper.update()).toMatchSnapshot();
});

it('should update the store as event handler', () => {
  const { dakpan: { Provider, Consumer, actions } } = createMockDakpan();

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
  expect(wrapper.update()).toMatchSnapshot();
});

it('should call an action with the correct parameters', () => {
  const { dakpan: { Provider, actions }, mockAction } = createMockDakpan();

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
  const { dakpan: { Provider, actions } } = createMockDakpan();

  mount(
    <Provider>
      <div/>
    </Provider>
  );

  expect(actions.error.e()).toThrow('Actions may only return objects');
});
