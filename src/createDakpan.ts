import {
  Component,
  ComponentClass,
  ConsumerProps,
  createContext,
  ProviderProps,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  StatelessComponent
} from 'react';

import { createConsumer } from './createConsumer';
import { createProvider } from './createProvider';
import { Actions, DakpanProviderProps, GetState, MappedActions, SetState } from './types';
import { withDakpan } from './withDakpan';

export const createDakpan = <S>(initialState: S) => <A extends Actions<S>>(actions: A) => {
  let getState: GetState<S> | undefined;
  let setState: SetState<S, DakpanProviderProps> | undefined;

  const mergeAction = (result: Partial<S>) => {
    if (!getState || !setState) {
      throw new Error('Provider unmounted before action could complete');
    } else if (typeof result !== 'object') {
      throw new Error('Actions may only return objects');
    }

    const newState = {
      ...getState() as any,
      ...result as any
    };

    setState(newState);

    return newState;
  };

  const { Provider, Consumer } = createContext<S>(initialState);
  const mappedActions = Object.keys(actions).reduce(
    (result, key) => {
      const e = (...args: any[]) => () => {
        const action = actions[key];

        if (!getState || !setState) {
          throw new Error('You may not dispatch an action before its provider is mounted');
        }

        const state = getState();
        const result = action(...args)(state);

        if (result instanceof Promise) {
          return result.then(mergeAction);
        }

        return mergeAction(result);
      };

      const action: any = (...args: any[]) => e(...args)();
      action.e = e;

      return {
        ...result,
        [key]: action
      };
    },
    {}
  ) as MappedActions<S, A>;

  const provider = createProvider(Provider, initialState, (get, set) => {
    getState = get;
    setState = set;
  });
  const consumer = createConsumer(Consumer, mappedActions);

  return {
    Provider: provider,
    Consumer: consumer,
    actions: mappedActions,
    withDakpan: withDakpan(consumer)
  };
};
