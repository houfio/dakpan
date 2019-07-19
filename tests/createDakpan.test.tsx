import { fireEvent, render, waitForDomChange } from '@testing-library/react';
import * as React from 'react';

import { createDakpan } from '../src/createDakpan';

const initialState = {
  count: 1
};

const [CountProvider, useCount] = createDakpan(initialState)({
  increase: () => ({ count }) => ({
    count: count + 1
  })
});

function Counter() {
  const [countState, countActions] = useCount();

  return (
    <button data-testid="button" onClick={countActions.increase}>{countState.count}</button>
  );
}

function App() {
  return (
    <CountProvider>
      <Counter/>
    </CountProvider>
  );
}

it('should return an array with a provider and hook', () => {
  expect(CountProvider).toBeDefined();
  expect(useCount).toBeDefined();
});

it('should provide the initial state', () => {
  const { getByTestId } = render(<App/>);
  const button = getByTestId('button');

  expect(button.textContent).toEqual('1');
});

it('should provide the initial state when the provider is unmounted', () => {
  const { getByTestId } = render(<Counter/>);
  const button = getByTestId('button');

  expect(button.textContent).toEqual('1');
});

it('should update the state', async () => {
  const { getByTestId } = render(<App/>);
  const button = getByTestId('button');

  fireEvent.click(button);

  await waitForDomChange();

  expect(button.textContent).toEqual('2');
});
