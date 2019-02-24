import React, { useState } from 'react';

import { useCart } from '../states/cart';

import { ProductEntry } from './ProductEntry';

export function Products() {
  const [cartState, cartActions] = useCart();
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <h2>Products</h2>
      {cartState.products.map((product) => (
        <div key={product.id} style={{ marginBottom: '1rem' }}>
          <ProductEntry product={product}/>
          <button
            onClick={() => {
              setDisabled(true);

              cartActions.buyProduct(product).then(() => setDisabled(false));
            }}
            disabled={disabled || !product.quantity}
          >
            {product.quantity ? 'Add to cart' : 'Sold out'}
          </button>
        </div>
      ))}
    </>
  );
}
