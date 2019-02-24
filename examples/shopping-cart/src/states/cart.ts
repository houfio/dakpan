import { createDakpan } from 'dakpan';

import { Product } from '../types';
import { buyProduct } from '../utils/buyProduct';
import { checkout } from '../utils/checkout';
import { getProducts } from '../utils/getProducts';

type State = {
  products: Product[],
  cart: Product[]
};

export const [CartProvider, useCart] = createDakpan<State>({
  products: [],
  cart: []
})({
  getProducts: () => async (state) => ({
    ...state,
    products: await getProducts()
  }),
  buyProduct: (product: Product) => async ({ products, cart, ...state }) => {
    const bought = await buyProduct(product);
    const inCart = cart.some((p) => p.id === bought.id);

    return {
      ...state,
      products: products.map((p) => p.id === bought.id ? bought : p),
      cart: inCart ? cart.map((p) => p.id === bought.id ? { ...p, quantity: p.quantity + 1 } : p) : [
        ...cart,
        {
          ...bought,
          quantity: 1
        }
      ]
    };
  },
  checkout: () => async (state) => {
    await checkout();

    return {
      ...state,
      cart: []
    };
  }
});
