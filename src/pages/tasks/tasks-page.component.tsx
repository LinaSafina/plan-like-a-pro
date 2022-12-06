import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//@ts-ignore
import * as DateJS from 'datejs';

import TasksCategories from '../../components/tasks-categories/tasks-categories.component';
import TextField from '../../components/text-field/text-field.component';

import { getTodos } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setTodos } from '../../store/todos/todos.action';
import './tasks-page.styles.scss';
import { selectAllTodos } from '../../store/todos/todos.selector';
import { ToDoType } from '../../components/modal/types';

const TasksPage = () => {
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useAppDispatch();

  const { projectId } = useParams();

  let tomorrow = Date.today().add(1).day();

  useEffect(() => {
    getTodos(projectId)
      .then((data) => {
        dispatch(setTodos(data));
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const checkStatus = async () => {
        if (tomorrow.compareTo(Date.today().setTimeToNow()) !== -1) {
          return;
        }

        const data = await getTodos(projectId);

        dispatch(setTodos(data));

        tomorrow = Date.today().add(1).day();
      };

      checkStatus();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value.trim().toLowerCase());
  };

  useEffect(() => {
    const filterTodos = (data: ToDoType[]) => {
      return data.filter(
        (todo) =>
          todo.id.toLowerCase().includes(searchValue) ||
          todo.title.toLowerCase().includes(searchValue)
      );
    };

    getTodos(projectId).then((data) =>
      dispatch(
        setTodos({
          queue: filterTodos(data.queue),
          progress: filterTodos(data.progress),
          completed: filterTodos(data.completed),
        })
      )
    );
  }, [searchValue]);

  return (
    <div className='container'>
      <div className='tasks'>
        <TextField
          type='search'
          id='to-do-search-input'
          name='to-do-search'
          label=''
          placeholder='Номер или название'
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <TasksCategories />
      </div>
    </div>
  );
};

export default TasksPage;
