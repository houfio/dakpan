import React, { useRef } from 'react';

import { useTodo } from '../states/todo';

export function AddTodo() {
  const [, todoActions] = useTodo();
  const input = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (!input.current || !input.current.value.trim()) {
          return;
        }

        todoActions.addTodo(input.current.value);
        input.current.value = '';
      }}
    >
      <input ref={input}/>
      <button type="submit">Add</button>
    </form>
  );
}
