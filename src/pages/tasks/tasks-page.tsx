import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//@ts-ignore
import * as DateJS from 'datejs';

import { apiUrl, getTodos, taskStatusCheck, TO_DO_STATUS } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllTodos } from '../../store/todos/todos.selector';
import { setTodos } from '../../store/todos/todos.action';
import './tasks-page.styles.scss';
import TasksCategories from '../../components/tasks-categories/tasks-categories.component';
import { ToDosState } from '../../store/todos/todos.reducer';

const TasksPage = () => {
  const dispatch = useAppDispatch();
  // const todos = useAppSelector(selectAllTodos);

  const { projectId } = useParams();

  let tomorrow = Date.today().add(1).day();

  useEffect(() => {
    getTodos(`${apiUrl}/todos.json?orderBy="projectId"&&equalTo="${projectId}"`)
      .then((data) => {
        dispatch(setTodos(data));
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (tomorrow.compareTo(Date.today().setTimeToNow()) !== -1) {
        return;
      }

      //@ts-ignore
      // todos.forEach(async ({ id, expiryDate, status }, index) => {
      //   if (status === TO_DO_STATUS.IN_PROGRESS) {
      //     const isExpired = await taskStatusCheck(id, expiryDate);

      //     if (isExpired) {
      //       //@ts-ignore
      //       todos[index] = { ...todos[index], status: TO_DO_STATUS.EXPIRED };

      //       dispatch(setTodos({...todos}));
      //     }
      //   }
      // });
      getTodos();

      tomorrow = Date.today().add(1).day();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='container'>
      <div className='tasks'>
        <TasksCategories />
      </div>
    </div>
  );
};

export default TasksPage;
