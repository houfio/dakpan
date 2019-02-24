import React from 'react';
import { render } from 'react-dom';

import { AddTodo } from './components/AddTodo';
import { Filters } from './components/Filters';
import { Todos } from './components/Todos';
import { TodoProvider } from './states/todo';

render(
  <TodoProvider>
    <AddTodo/>
    <Todos/>
    <Filters/>
  </TodoProvider>,
  document.getElementById('root')
);
