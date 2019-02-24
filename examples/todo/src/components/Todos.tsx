import React from 'react';

import { useTodo } from '../states/todo';
import { Visibility } from '../types';

export function Todos() {
  const [todoState, todoActions] = useTodo();

  return (
    <ul>
      {todoState.todos.map((todo, index) => {
        if (todoState.visibility !== Visibility.All
          && ((todo.completed && todoState.visibility === Visibility.Uncompleted)
            || (!todo.completed && todoState.visibility === Visibility.Completed))) {
          return null;
        }

        return (
          <li
            key={index}
            onClick={todoActions.toggleTodo.c(index)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        );
      })}
    </ul>
  );
}
