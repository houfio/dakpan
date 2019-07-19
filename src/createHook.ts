import { Context, useContext } from 'react';

import { Actions, DakpanHook, MappedActions } from './types';

export const createHook = <S, A extends Actions<S>>(
  context: Context<S>,
  actions: MappedActions<S, A>
): DakpanHook<S, A> => () => {
  const state = useContext(context);

  return [
    state,
    actions
  ];
};
