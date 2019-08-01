import { fireEvent, render, waitForDomChange } from '@testing-library/react';
import { useCallback } from 'react';
import * as React from 'react';

import { createDakpan } from '../src/createDakpan';

const initialState = {
  count: 1
};

const [CountProvider, useCount, withCount] = createDakpan(initialState)({
  increase: () => ({ count }) => ({
    count: count + 1
  })
});

function Counter() {
  const [countState, countActions] = useCount();
  const doubleIncrease = useCallback(() => {
    countActions.increase().then(countActions.increase);
  }, [countActions]);

  return (
    <>
      <button data-testid="button" onClick={countActions.increase}>{countState.count}</button>
      <button data-testid="button-two" onClick={doubleIncrease}>{countState.count}</button>
    </>
  );
}

function App() {
  return (
    <CountProvider>
      <Counter/>
    </CountProvider>
  );
}

type Props = {
  test: string
};

const HocCounter = withCount(({ count }, { increase }) => ({ count, increase }))<Props>(({ count, increase, test }) => (
  <button data-testid="button" onClick={increase}>{count} {test}</button>
));

function HocApp() {
  return (
    <CountProvider>
      <HocCounter test="test"/>
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

it('should throw when the provider is unmounted', () => {
  expect(() => render(<Counter/>)).toThrow('Provider not mounted');
  expect(() => render(<HocCounter test="test"/>)).toThrow('Provider not mounted');
});

it('should update the state', async () => {
  const { getByTestId } = render(<App/>);
  const button = getByTestId('button');

  fireEvent.click(button);

  await waitForDomChange();

  expect(button.textContent).toEqual('2');
});

it('should update the state with the hoc', async () => {
  const { getByTestId } = render(<HocApp/>);
  const button = getByTestId('button');

  fireEvent.click(button);

  await waitForDomChange();

  expect(button.textContent).toEqual('2 test');
});

it('should update the multiple times in a single render', async () => {
  const { getByTestId } = render(<App/>);
  const button = getByTestId('button-two');

  fireEvent.click(button);

  await waitForDomChange();

  expect(button.textContent).toEqual('3');
});
