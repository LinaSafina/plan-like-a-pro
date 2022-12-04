import { useContext, useEffect } from 'react';
//@ts-ignore
import * as DateJS from 'datejs';

import NewToDo from './components/new-to-do/new-to-do.component';
import ToDoList from './components/to-do-list/to-do-list.component';

import './App.scss';
import { getData, taskStatusCheck, TO_DO_STATUS } from './api/api';
import { TodosContext } from './context/todos.context';

function App() {
  const { todos, setTodos } = useContext(TodosContext);

  let tomorrow = Date.today().add(1).day();

  useEffect(() => {
    getData().then((data) => {
      setTodos(data);
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (tomorrow.compareTo(Date.today().setTimeToNow()) !== -1) {
        return;
      }

      todos.forEach(async ({ id, expiryDate, status }, index) => {
        if (status === TO_DO_STATUS.IN_PROGRESS) {
          const isExpired = await taskStatusCheck(id, expiryDate);

          if (isExpired) {
            //@ts-ignore
            todos[index] = { ...todos[index], status: TO_DO_STATUS.EXPIRED };

            setTodos([...todos]);
          }
        }
      });

      tomorrow = Date.today().add(1).day();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='to-do'>
      <NewToDo />
      {todos.length > 0 && <ToDoList />}
    </div>
  );
}

export default App;
