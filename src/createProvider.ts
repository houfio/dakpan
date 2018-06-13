import {
  Component,
  ComponentClass,
  createElement,
  Provider,
  ProviderProps,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  StatelessComponent
} from 'react';

import { DakpanProviderProps, ProviderCallback } from './types';

export const createProvider = <S>(
  Provider: Provider<S>,
  defaultState: S,
  callback: ProviderCallback<S>
) => class extends Component<DakpanProviderProps, S> {
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

    return createElement(Provider, {
      value: this.state,
      children
    });
  }

  public getState = () => this.state;
};
