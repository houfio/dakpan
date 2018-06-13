import {
  Component,
  ComponentClass,
  createElement,
  Provider as ReactProvider,
  ProviderProps,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  StatelessComponent
} from 'react';

import { DakpanProviderProps, ProviderCallback } from './types';

export const createProvider = <S>(
  ReactProvider: ReactProvider<S>,
  defaultState: S,
  callback: ProviderCallback<S>
) => class Provider extends Component<DakpanProviderProps, S> {
  public constructor(props: DakpanProviderProps) {
    super(props);

    this.state = defaultState;
    callback(this.getState, this.setState.bind(this));
  }

  public componentWillUnmount() {
    callback();
  }

  public render() {
    const { children } = this.props;

    return createElement(ReactProvider, {
      value: this.state,
      children
    });
  }

  public getState = () => this.state;
};
