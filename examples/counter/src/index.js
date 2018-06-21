import React from 'react';
import { render } from 'react-dom';

import { Provider } from './state';
import { Counter } from './components/Counter';

render(
  <Provider>
    <Counter/>
  </Provider>,
  document.getElementById('root')
);
