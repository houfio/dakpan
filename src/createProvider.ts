import { createElement, FunctionComponent, useEffect, useState } from 'react';

import { Actions, DakpanContext, InitialState, MappedActions, ProviderCallback } from './types';

export const createProvider = <S, A extends Actions<S>>(
  context: DakpanContext<S, A>,
  initialState: InitialState<S>,
  actions: MappedActions<S, A>,
  callback: ProviderCallback<S>
): FunctionComponent => ({ children }) => {
  const [state, setState] = useState(initialState);

  callback(() => state, setState);
  useEffect(() => callback, []);

  return createElement(context.Provider, {
    value: {
      state,
      actions
    },
    children
  });
};
