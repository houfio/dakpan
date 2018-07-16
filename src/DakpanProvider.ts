import { createElement, ReactElement } from 'react';

import { DakpanMultiProviderProps } from './types';

export const DakpanProvider = ({ provide, children }: DakpanMultiProviderProps) => (
  provide.reduce((previous, current) => createElement(current, { children: previous }), children as ReactElement<any>)
);
