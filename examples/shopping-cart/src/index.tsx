import React from 'react';
import { render } from 'react-dom';

import { App } from './components/App';
import { CartProvider } from './states/cart';

render(
  <CartProvider>
    <App/>
  </CartProvider>,
  document.getElementById('root')
);
