import React from 'react';
import { render } from 'react-dom';

import { Counter } from './containers/Counter';
import { CounterProvider } from './states/counter';

render(
  <CounterProvider>
    <Counter/>
  </CounterProvider>,
  document.getElementById('root')
);
