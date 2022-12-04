import { createContext, useState } from 'react';

const initialValue = {
  todos: [],
  setTodos: (todos) => {},
};

export const TodosContext = createContext(initialValue);

export const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState(initialValue);

  const value = { todos, setTodos };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
