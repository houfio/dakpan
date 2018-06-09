import { ComponentClass, Consumer, ConsumerProps, createElement, ReactElement, StatelessComponent } from 'react';

import { Actions, DakpanConsumerProps, MappedActions } from './types';

export const createConsumer = <S, A extends Actions<S>>(
  Consumer: Consumer<S>,
  actions: MappedActions<S, A>
) => ({ children }: DakpanConsumerProps<S, A>) => createElement(Consumer, {
  children: (value: S) => children(value, actions)
});
