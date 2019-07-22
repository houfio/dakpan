import { createContext } from 'react';

import { createHoc } from './createHoc';
import { createHook } from './createHook';
import { createProvider } from './createProvider';
import { Actions, Dakpan, DakpanContext, InitialState } from './types';

export const createDakpan = <S extends object>(
  initialState: InitialState<S>
) => <A extends Actions<S>>(actions: A): Dakpan<S, A> => {
  const context = createContext<DakpanContext<S, A>>(undefined);
  const hook = createHook(context);

  return [
    createProvider(context, actions, initialState),
    hook,
    createHoc(hook)
  ];
};
