import { Context, useContext } from 'react';

import { Actions, DakpanContext, DakpanHook } from './types';

export function createHook<S, A extends Actions<S>>(context: Context<DakpanContext<S, A>>): DakpanHook<S, A> {
  return () => {
    const state = useContext(context);

    if (!state) {
      throw Error('Provider not mounted');
    }

    return [
      state.state,
      state.actions
    ];
  };
}
