import { useContext } from 'react';

import { Actions, DakpanContext, DakpanHook } from './types';

export const createHook = <S, A extends Actions<S>>(context: DakpanContext<S, A>): DakpanHook<S, A> => () => {
  const { state, actions } = useContext(context);

  return [
    state,
    actions
  ];
};
