import { Consumer as ReactConsumer, createElement } from 'react';

import { Actions, DakpanConsumerProps, MappedActions } from './types';

export const createConsumer = <S, A extends Actions<S>>(
  ReactConsumer: ReactConsumer<S>,
  actions: MappedActions<S, A>
) => {
  const Consumer = ({ children }: DakpanConsumerProps<S, A>) => createElement(ReactConsumer, {
    children: (value: S) => children(value, actions)
  });

  return Consumer;
};
