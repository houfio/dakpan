import { Product } from '../types';

export function getTotal(cart: Product[]) {
  return cart.reduce((previous, current) => previous + current.price * current.quantity, 0);
}
