import { createElement, FunctionComponent } from 'react';

import { Actions, DakpanHoc, DakpanHook } from './types';

export const createHoc = <S, A extends Actions<S>>(
  hook: DakpanHook<S, A>
): DakpanHoc<S, A> => (map) => (component) => {
  const hoc: FunctionComponent<any> = (props) => {
    const [state, actions] = hook();

    return createElement(component, {
      ...props,
      ...map(state, actions)
    });
  };

  hoc.displayName = `WithDakpan(${component.displayName || component.name || 'Unknown'})`;

  return hoc;
};
