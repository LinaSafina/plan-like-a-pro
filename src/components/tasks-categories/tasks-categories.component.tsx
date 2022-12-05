import { useState } from 'react';

import ToDoList from '../to-do-list/to-do-list.component';

import { ToDoType } from '../modal/types';
import './tasks-categories.styles.scss';
import Modal from '../modal/modal.component';
import { useAppSelector } from '../../store/hooks';
import {
  selectQueueToDos,
  selectCompletedToDos,
  selectProgressToDos,
} from '../../store/todos/todos.selector';

const defaultChosenTodo = {
  title: '',
  description: '',
  expiryDate: '',
  files: [],
  id: '',
  status: '',
  projectId: '',
  priority: 'низкий',
  parentTodo: '',
  createDate: '',
};

const TasksCategories = () => {
  const [chosenToDo, setChosenToDo] = useState<ToDoType>(defaultChosenTodo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const queueToDos = useAppSelector(selectQueueToDos);
  const progressToDos = useAppSelector(selectProgressToDos);
  const completedToDos = useAppSelector(selectCompletedToDos);

  console.log(queueToDos, progressToDos, completedToDos);

  const handleModalOpen = (item: ToDoType) => {
    setChosenToDo(item);
    setIsModalOpen(true);
    setModalType('view');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setChosenToDo(defaultChosenTodo);
    setModalType('editing');
  };

  const handleButtonClick = () => {
    setModalType('creating');
    setIsModalOpen(true);
    setChosenToDo(defaultChosenTodo);
  };

  return (
    <>
      <div className='tasks__categories'>
        <ToDoList
          handleModalOpen={handleModalOpen}
          setModalType={setModalType}
          heading='Очередь'
          todos={queueToDos}
        />
        <ToDoList
          handleModalOpen={handleModalOpen}
          setModalType={setModalType}
          heading='В разработке'
          todos={progressToDos}
        />
        <ToDoList
          handleModalOpen={handleModalOpen}
          setModalType={setModalType}
          heading='Сделано'
          todos={completedToDos}
        />
        <div className='tasks__actions'>
          <button
            className='tasks__add-todo button button--big'
            onClick={handleButtonClick}
          >
            Добавить задачу
          </button>
        </div>
      </div>
      <Modal
        data={chosenToDo}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        modalType={modalType}
        setModalType={setModalType}
        heading='Что нужно сделать?'
      />
    </>
  );
};

export default TasksCategories;
