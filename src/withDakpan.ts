import { ComponentType } from 'react';

import { HOCFunc, HOCProps } from './types';

export function withDakpan<
  A extends HOCFunc<any>
>(a: A): <P>(
  c: ComponentType<P & HOCProps<A>>
) => ComponentType<P>;

export function withDakpan<
  A extends HOCFunc<any>,
  B extends HOCFunc<any>
>(a: A, b: B): <P>(
  c: ComponentType<P & HOCProps<A> & HOCProps<B>>
) => ComponentType<P>;

export function withDakpan<
  A extends HOCFunc<any>,
  B extends HOCFunc<any>,
  C extends HOCFunc<any>
>(a: A, b: B, C: C): <P>(
  c: ComponentType<P & HOCProps<A> & HOCProps<B> & HOCProps<C>>
) => ComponentType<P>;

export function withDakpan<
  A extends HOCFunc<any>,
  B extends HOCFunc<any>,
  C extends HOCFunc<any>,
  D extends HOCFunc<any>
>(a: A, b: B, c: C, d: D): <P>(
  c: ComponentType<P & HOCProps<A> & HOCProps<B> & HOCProps<C> & HOCProps<D>>
) => ComponentType<P>;

export function withDakpan<
  A extends HOCFunc<any>,
  B extends HOCFunc<any>,
  C extends HOCFunc<any>,
  D extends HOCFunc<any>,
  E extends HOCFunc<any>
>(a: A, b: B, c: C, d: D, e: E): <P>(
  c: ComponentType<P & HOCProps<A> & HOCProps<B> & HOCProps<C> & HOCProps<D> & HOCProps<E>>
) => ComponentType<P>;

export function withDakpan<
  A extends HOCFunc<any>,
  B extends HOCFunc<any>,
  C extends HOCFunc<any>,
  D extends HOCFunc<any>,
  E extends HOCFunc<any>,
  F extends HOCFunc<any>
>(a: A, b: B, c: C, d: D, e: E, f: F): <P>(
  c: ComponentType<P & HOCProps<A> & HOCProps<B> & HOCProps<C> & HOCProps<D> & HOCProps<E> & HOCProps<F>>
) => ComponentType<P>;

// todo: change to 'unknown' type in 2.0.0
export function withDakpan(...hocs: Array<HOCFunc<any>>): <P>(c: ComponentType<any>) => ComponentType<P>;

export function withDakpan(...hocs: Array<HOCFunc<any>>): <P>(c: ComponentType<any>) => ComponentType<P> {
  if (!hocs.length) {
    return (arg) => arg;
  }

  return hocs.reduce((previous, current) => (c) => previous(current(c)));
}
