import { Context, createElement, FunctionComponent, useEffect, useState } from 'react';

import { Actions, InitialState, ProviderCallback } from './types';

export const createProvider = <S, A extends Actions<S>>(
  context: Context<S>,
  initialState: InitialState<S>,
  callback: ProviderCallback<S>
): FunctionComponent => ({ children }) => {
  const [value, setValue] = useState(initialState);

  callback(() => value, setValue);
  useEffect(() => callback, []);

  return createElement(context.Provider, {
    value
  }, children);
};
