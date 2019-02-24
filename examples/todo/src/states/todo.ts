import { createDakpan } from 'dakpan';

import { Todo, Visibility } from '../types';

type State = {
  todos: Todo[],
  visibility: Visibility
};

export const [TodoProvider, useTodo] = createDakpan<State>({
  todos: [],
  visibility: Visibility.All
})({
  addTodo: (text: string) => ({ todos, ...state }) => ({
    ...state,
    todos: [
      ...todos,
      {
        text,
        completed: false
      }
    ]
  }),
  toggleTodo: (key: number) => ({ todos, ...state }) => ({
    ...state,
    todos: todos.map((todo, index) => index === key ? { ...todo, completed: !todo.completed } : todo)
  }),
  setVisibility: (visibility: Visibility) => (state) => ({
    ...state,
    visibility
  })
});
