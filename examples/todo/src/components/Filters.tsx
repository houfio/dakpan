import React from 'react';

import { useTodo } from '../states/todo';
import { Visibility } from '../types';

export function Filters() {
  const [, todoActions] = useTodo();

  return (
    <>
      <button onClick={todoActions.setVisibility.c(Visibility.All)}>All</button>
      <button onClick={todoActions.setVisibility.c(Visibility.Uncompleted)}>Uncompleted</button>
      <button onClick={todoActions.setVisibility.c(Visibility.Completed)}>Completed</button>
    </>
  );
}
