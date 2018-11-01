import { createElement, StatelessComponent, useEffect, useState } from 'react';

import { Actions, DakpanContext, MappedActions, ProviderCallback } from './types';

export const createProvider = <S, A extends Actions<S>>(
  context: DakpanContext<S, A>,
  initialState: S,
  actions: MappedActions<S, A>,
  callback: ProviderCallback<S>
): StatelessComponent => ({ children }) => {
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
