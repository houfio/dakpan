import { Product } from '../types';

import { sleep } from './sleep';

export async function getProducts(): Promise<Product[]> {
  await sleep(100);

  return [
    {
      id: 1,
      title: 'Smartphone',
      price: 500,
      quantity: 10
    },
    {
      id: 2,
      title: 'Tablet',
      price: 400,
      quantity: 5
    },
    {
      id: 3,
      title: 'Smartwatch',
      price: 200,
      quantity: 20
    }
  ];
}
