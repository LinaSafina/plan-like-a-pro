import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import 'datejs';

import TasksCategories from '../../components/tasks-categories/tasks-categories.component';
import TextField from '../../components/text-field/text-field.component';

import { getTodosStart } from '../../store/todos/todos.action';
import './tasks-page.styles.scss';

const TasksPage = () => {
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();

  const { projectId } = useParams();

  let tomorrow = Date.today().add(1).day();

  useEffect(() => {
    dispatch(getTodosStart(projectId));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const checkStatus = async () => {
        if (tomorrow.compareTo(Date.today().setTimeToNow()) !== -1) {
          return;
        }

        dispatch(getTodosStart(projectId));

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
    dispatch(getTodosStart(projectId, searchValue));
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
