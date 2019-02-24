import { Product } from '../types';

import { sleep } from './sleep';

export async function buyProduct(product: Product): Promise<Product> {
  await sleep(100);

  return {
    ...product,
    quantity: product.quantity - 1
  };
}
