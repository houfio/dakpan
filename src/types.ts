import { Context, FunctionComponent } from 'react';

export type Dakpan<S, A extends Actions<S>> = [FunctionComponent, DakpanHook<S, A>];

export type DakpanContext<S, A extends Actions<S>> = Context<DakpanContextValue<S, A>>;

export type DakpanContextValue<S, A extends Actions<S>> = {
  state: S,
  actions: MappedActions<S, A>
};

export type DakpanHook<S, A extends Actions<S>> = () => [S, MappedActions<S, A>];

export type ProviderCallback<S> = (get?: GetState<S>, set?: SetState<S>) => void;

export type GetState<S> = () => S;

export type SetState<S> = (value: S) => void;

export type Actions<S> = {
  [action: string]: (...args: any[]) => (state: S) => S | undefined | Promise<S | undefined>
};

export type MappedActions<S, A extends Actions<S>> = {
  [K in keyof A]: ((...args: FunctionArguments<A[K]>) => Promise<void>) & {
    c: (...args: FunctionArguments<A[K]>) => () => Promise<void>
  }
};

export type FunctionArguments<F> = F extends (...args: infer A) => unknown ? A : never;
