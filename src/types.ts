import { ComponentType, ReactNode } from 'react';

export type Dakpan<S, A extends Actions<S>> = {
  Provider: ComponentType<DakpanProviderProps>,
  Consumer: ComponentType<DakpanConsumerProps<S>>,
  actions: MappedActions<S, A>
};

export type DakpanProviderProps = {
  children: ReactNode
};

export type DakpanConsumerProps<S> = {
  children: (state: S) => ReactNode
};

export type Actions<S> = {
  [ action: string ]: (...args: any[]) => (state: S) => Partial<S> | Promise<Partial<S>>
};

export type MappedActions<S, A extends Actions<S>> = {
  [N in keyof A]: (...args: any[]) => ReturnType<ReturnType<A[N]>> extends Promise<Partial<S>> ? Promise<void> : void
};

export type GetState<S> = () => S;

export type SetState<S, P> = <K extends keyof S>(
  state: ((prevState: Readonly<S>, props: P) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
  callback?: () => void
) => void;

export type ProviderCallback<S> = (getState?: GetState<S>, setState?: SetState<S, DakpanProviderProps>) => void;
