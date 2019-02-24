import React, { useEffect } from 'react';

import { useCart } from '../states/cart';

import { Cart } from './Cart';
import { Products } from './Products';

export function App() {
  const [, cartActions] = useCart();

  useEffect(() => {
    cartActions.getProducts();
  }, []);

  return (
    <>
      <h1>Shopping Cart</h1>
      <hr/>
      <Products/>
      <hr/>
      <Cart/>
    </>
  );
}
