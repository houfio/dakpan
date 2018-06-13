import { ComponentType, createElement, ReactElement } from 'react';

import { Actions, DakpanConsumerProps, MappedActions, Omit } from './types';

export const withDakpan = <S, A extends Actions<S>>(
  consumer: ComponentType<DakpanConsumerProps<S, A>>
) => <H>(
  map: (state: S, actions: MappedActions<S, A>) => H
) => <P>(
  component: ComponentType<P & H>
) => {
  const WithDakpan = (props: Omit<P, keyof H>) => createElement(consumer, {
    children: (state: S, actions: MappedActions<S, A>) => createElement(component, {
      ...props as any,
      ...map(state, actions) as any
    })
  });

  return WithDakpan;
};
