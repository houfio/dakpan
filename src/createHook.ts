import { Context, useContext } from 'react';

import { Actions, DakpanContext, DakpanHook } from './types';

export const createHook = <S, A extends Actions<S>>(context: Context<DakpanContext<S, A>>): DakpanHook<S, A> => () => {
  const state = useContext(context);

  if (!state) {
    throw Error('Provider not mounted');
  }

  return [
    state.state,
    state.actions
  ];
};
