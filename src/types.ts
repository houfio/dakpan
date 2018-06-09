import { ComponentType, ReactNode } from 'react';

export type Dakpan<S, A extends Actions<S>> = {
  Provider: ComponentType<DakpanProviderProps>,
  Consumer: ComponentType<DakpanConsumerProps<S, A>>,
  actions: MappedActions<S, A>
};

export type DakpanProviderProps = {
  children: ReactNode
};

export type DakpanConsumerProps<S, A extends Actions<S>> = {
  children: (state: S, actions: MappedActions<S, A>) => ReactNode
};

export type Actions<S> = {
  [action: string]: (...args: any[]) => (state: S) => Partial<S> | Promise<Partial<S>>
};

export type MappedActions<S, A extends Actions<S>> = {
  [N in keyof A]: Action<S, A, N>
};

export type Action<S, A extends Actions<S>, N extends keyof A> = {
  (...args: any[]): ActionReturn<S, A, N>,
  e: (...args: any[]) => () => ActionReturn<S, A, N>
};

export type ActionReturn<S, A extends Actions<S>, N extends keyof A> =
  ReturnType<ReturnType<A[N]>> extends Promise<Partial<S>> ? Promise<void> : void;

export type GetState<S> = () => S;

export type SetState<S, P> = <K extends keyof S>(
  state: ((prevState: Readonly<S>, props: P) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
  callback?: () => void
) => void;

export type ProviderCallback<S> = (getState?: GetState<S>, setState?: SetState<S, DakpanProviderProps>) => void;
