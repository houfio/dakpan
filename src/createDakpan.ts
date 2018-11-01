import { createContext } from 'react';

import { createHook } from './createHook';
import { createProvider } from './createProvider';
import { Actions, Dakpan, DakpanContextValue, GetState, MappedActions, ProviderCallback, SetState } from './types';

export const createDakpan = <S>(initialState: S) => <A extends Actions<S>>(actions: A): Dakpan<S, A> => {
  const context = createContext<DakpanContextValue<S, A>>(undefined!);
  let getState: GetState<S> | undefined;
  let setState: SetState<S> | undefined;

  const callback: ProviderCallback<S> = (get, set) => {
    getState = get;
    setState = set;
  };

  const mapped = Object.keys(actions).reduce(
    (previous, current) => {
      const curry = (...args: unknown[]) => () => {
        const action = actions[current];

        if (!getState || !setState) {
          throw new Error('You may not dispatch an action without its provider mounted');
        }

        const state = action(...args)(getState());

        setState(state);
      };

      const action = (...args: unknown[]) => curry(...args)();
      action.c = curry;

      return {
        ...previous,
        [current]: action
      };
    },
    {}
  ) as MappedActions<S, A>;

  return [
    createProvider(context, initialState, mapped, callback),
    createHook(context)
  ];
};
