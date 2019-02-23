import { useContext } from 'react';

import { Actions, DakpanContext, DakpanHook } from './types';

export const createHook = <S, A extends Actions<S>>(context: DakpanContext<S, A>): DakpanHook<S, A> => () => {
  const dakpan = useContext(context);

  if (!dakpan) {
    throw new Error('Provider not mounted');
  }

  return [
    dakpan.state,
    dakpan.actions
  ];
};
