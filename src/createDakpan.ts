import { createContext } from 'react';

import { createProvider } from './createProvider';
import { Actions, Dakpan, DakpanProviderProps, GetState, SetState } from './types';

export const createDakpan = <S>(initialState: S) => <A extends Actions<S>>(actions: A): Dakpan<S, A> => {
  let getState: GetState<S> | undefined;
  let setState: SetState<S, DakpanProviderProps> | undefined;

  const { Provider, Consumer } = createContext<S>(initialState);
  const provider = createProvider(Provider, initialState, (get, set) => {
    getState = get;
    setState = set;
  });

  return {
    Provider: provider,
    Consumer,
    actions: Object.keys(actions).reduce(
      (result, key) => {
        const e = (...args: any[]) => () => {
          const action = actions[ key ];

          if (!getState || !setState) {
            throw new Error('You may not dispatch an action before its provider is mounted');
          }

          const state = getState();
          const result = action(...args)(state);

          if (typeof result !== 'object') {
            throw new Error('Actions may only return objects');
          } else if (result instanceof Promise) {
            return result.then((value) => {
              if (!setState) {
                throw new Error('Provider unmounted before action could complete');
              }

              setState(value as Pick<S, keyof S>);
            });
          }

          setState(result as Pick<S, keyof S>);
        };

        const action: any = (...args: any[]) => e(...args)();
        action.e = e;

        return {
          ...result,
          [ key ]: action
        };
      },
      {}
    ) as any
  };
};
