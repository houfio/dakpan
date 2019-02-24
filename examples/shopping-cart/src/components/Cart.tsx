import React from 'react';

import { useCart } from '../states/cart';
import { getTotal } from '../utils/getTotal';

import { ProductEntry } from './ProductEntry';

export function Cart() {
  const [cartState, cartActions] = useCart();

  return (
    <>
      <h2>Cart</h2>
      <div style={{ marginBottom: '1rem' }}>
        {cartState.cart.map((product) => (
          <div key={product.id}>
            <ProductEntry product={product}/>
          </div>
        ))}
      </div>
      <button onClick={cartActions.checkout}>Checkout</button>
      <div>Total: €{getTotal(cartState.cart)}</div>
    </>
  );
}
