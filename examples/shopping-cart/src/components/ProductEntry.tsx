import React from 'react';

import { Product } from '../types';

type Props = {
  product: Product
};

export function ProductEntry({ product }: Props) {
  return (
    <div>
      {product.title} - €{product.price} x {product.quantity}
    </div>
  );
}
