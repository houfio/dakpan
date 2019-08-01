import { Context, createElement, FunctionComponent, useMemo, useRef, useState } from 'react';

import { Actions, DakpanContext, MappedActions } from './types';

export function createProvider<S, A extends Actions<S>>(
  context: Context<DakpanContext<S, A>>,
  actions: A,
  state?: S
): FunctionComponent<any> {
  return ({ children, value }) => {
    const [, update] = useState({});
    const stateRef = useRef(state || value);
    const mapped = useMemo(() => Object.keys(actions).reduce(
      (previous, current) => {
        const execute = (...args: unknown[]) => () => Promise.resolve(actions[current](...args)(stateRef.current))
          .then((next) => {
            if (next) {
              stateRef.current = next;
              update({});
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
    ) as MappedActions<S, A>, [actions, stateRef]);

    return createElement(context.Provider, {
      value: {
        state: stateRef.current,
        actions: mapped
      }
    }, children);
  };
}
