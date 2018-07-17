import { ComponentType, ReactElement, ReactNode } from 'react';

export type DakpanProviderProps = {
  children: ReactNode
};

export type DakpanConsumerProps<S, A extends Actions<S>> = {
  children: (state: S, actions: MappedActions<S, A>) => ReactNode
};

export type DakpanMultiProviderProps = {
  provide: Array<ComponentType<DakpanProviderProps>>,
  children: ReactNode
};

export type Actions<S> = {
  [action: string]: Action<S>
};

export type Action<S> = (...args: any[]) => (state: S) => Partial<S> | Promise<Partial<S>>;

export type MappedActions<S, A extends Actions<S>> = {
  [N in keyof A]: MappedAction<S, A[N], false> & {
    e: MappedAction<S, A[N], true>
  }
};

type IsValidArg<T> = T extends object ? keyof T extends never ? false : true : true;

// tslint:disable
type MappedAction<XS, XF extends (...args: any[]) => any, XD extends boolean> =
  XF extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G, h: infer H, i: infer I, j: infer J) => infer R ? (
    IsValidArg<J> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => ActionReturn<XS, XF, XD> :
      IsValidArg<I> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => ActionReturn<XS, XF, XD> :
        IsValidArg<H> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => ActionReturn<XS, XF, XD> :
          IsValidArg<G> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => ActionReturn<XS, XF, XD> :
            IsValidArg<F> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F) => ActionReturn<XS, XF, XD> :
              IsValidArg<E> extends true ? (a: A, b: B, c: C, d: D, e: E) => ActionReturn<XS, XF, XD> :
                IsValidArg<D> extends true ? (a: A, b: B, c: C, d: D) => ActionReturn<XS, XF, XD> :
                  IsValidArg<C> extends true ? (a: A, b: B, c: C) => ActionReturn<XS, XF, XD> :
                    IsValidArg<B> extends true ? (a: A, b: B) => ActionReturn<XS, XF, XD> :
                      IsValidArg<A> extends true ? (a: A) => ActionReturn<XS, XF, XD> :
                        () => ActionReturn<XS, XF, XD>
    ) : never;

export type ActionReturn<S, F extends (...args: any[]) => any, D extends boolean> =
  ReturnType<ReturnType<F>> extends Promise<Partial<S>> ? D extends true ? () => Promise<void> : Promise<void> : D extends true ? () => void : void;
// tslint:enable

export type GetState<S> = () => S;

export type SetState<S, P> = <K extends keyof S>(
  state: ((prevState: Readonly<S>, props: P) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
  callback?: () => void
) => void;

export type ProviderCallback<S> = (getState?: GetState<S>, setState?: SetState<S, DakpanProviderProps>) => void;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type HOCFunc<H> = <P>(c: ComponentType<H & P>) => ComponentType<P>;

export type HOCProps<W> = W extends HOCFunc<infer H> ? H : never;
