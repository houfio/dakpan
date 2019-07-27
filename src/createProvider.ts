import { Context, createElement, FunctionComponent, useMemo, useState } from 'react';

import { Actions, DakpanContext, InitialState, MappedActions } from './types';

export function createProvider<S, A extends Actions<S>>(
  context: Context<DakpanContext<S, A>>,
  actions: A,
  initialState?: InitialState<S>
): FunctionComponent<any> {
  return ({ children, value }) => {
    const [state, setState] = useState(initialState || value);
    const mapped = useMemo(() => Object.keys(actions).reduce(
      (previous, current) => {
        const execute = (...args: unknown[]) => () => Promise.resolve(actions[current](...args)(state))
          .then((next) => {
            if (next) {
              setState(next);
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
    ) as MappedActions<S, A>, [actions, state]);

    return createElement(context.Provider, {
      value: {
        state,
        actions: mapped
      }
    }, children);
  };
}
