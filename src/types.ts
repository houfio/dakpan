import { ComponentType, FunctionComponent } from 'react';

export type Dakpan<S, A extends Actions<S>> = [FunctionComponent, DakpanHook<S, A>, DakpanHoc<S, A>];

export type DakpanHook<S, A extends Actions<S>> = () => [S, MappedActions<S, A>];

export type DakpanHoc<S, A extends Actions<S>> = <H>(
  map: (state: S, actions: MappedActions<S, A>) => H
) => <P>(
  component: ComponentType<P & H>
) => ComponentType<P>;

export type DakpanContext<S, A extends Actions<S>> = undefined | {
  state: S,
  actions: MappedActions<S, A>
};

export type Actions<S> = {
  [action: string]: (...args: any[]) => (state: S) => S | undefined | Promise<S | undefined>
};

export type MappedActions<S, A extends Actions<S>> = {
  [K in keyof A]: ((...args: Parameters<A[K]>) => Promise<void>) & {
    c: (...args: Parameters<A[K]>) => () => Promise<void>
  }
};

export type InitialState<S> = S | (() => S);
