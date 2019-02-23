import { createContext } from 'react';

import { createHook } from './createHook';
import { createProvider } from './createProvider';
import {
  Actions,
  Dakpan,
  DakpanContextValue,
  GetState,
  InitialState,
  MappedActions,
  ProviderCallback,
  SetState
} from './types';

export const createDakpan = <S extends object>(
  initialState: InitialState<S>
) => <A extends Actions<S>>(actions: A): Dakpan<S, A> => {
  const context = createContext<DakpanContextValue<S, A>>(undefined!);
  let getState: GetState<S> | undefined;
  let setState: SetState<S> | undefined;

  const callback: ProviderCallback<S> = (get, set) => {
    getState = get;
    setState = set;
  };

  const mapped = Object.keys(actions).reduce(
    (previous, current) => {
      const execute = (...args: unknown[]) => () => Promise.resolve(actions[current](...args)(getState!()))
        .then((state) => {
          if (state) {
            setState!(state);
          }
        });

      const action = (...args: unknown[]) => execute(...args)();
      action.c = execute;

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
