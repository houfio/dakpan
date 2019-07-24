import { createElement, FunctionComponent } from 'react';

import { Actions, DakpanHoc, DakpanHook } from './types';

export function createHoc<S, A extends Actions<S>>(hook: DakpanHook<S, A>): DakpanHoc<S, A> {
  return (map) => (component) => {
    const hoc: FunctionComponent<any> = (props) => {
      const [state, actions] = hook();

      return createElement(component, {
        ...props,
        ...map(state, actions)
      });
    };

    hoc.displayName = `WithDakpan(${component.displayName || component.name || 'Component'})`;

    return hoc;
  };
}
