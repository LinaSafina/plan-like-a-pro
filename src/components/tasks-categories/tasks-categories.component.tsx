import { useState } from 'react';

import ToDoList from '../to-do-list/to-do-list.component';

import { ToDoType } from '../modal/types';
import './tasks-categories.styles.scss';
import Modal from '../modal/modal.component';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectQueueToDos,
  selectCompletedToDos,
  selectProgressToDos,
} from '../../store/todos/todos.selector';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { editItem, editStatus } from '../../api/api';
import { setTodos } from '../../store/todos/todos.action';
import { useParams } from 'react-router';

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

  const dispatch = useAppDispatch();

  const { projectId } = useParams();

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

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const data = await editItem(
      draggableId,
      {
        status: destination.droppableId,
      },
      projectId
    );

    dispatch(setTodos(data));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='tasks__categories'>
        <ToDoList
          handleModalOpen={handleModalOpen}
          setModalType={setModalType}
          heading='Очередь'
          todos={queueToDos}
          id='queue'
        />
        <ToDoList
          handleModalOpen={handleModalOpen}
          setModalType={setModalType}
          heading='В разработке'
          todos={progressToDos}
          id='progress'
        />
        <ToDoList
          handleModalOpen={handleModalOpen}
          setModalType={setModalType}
          heading='Сделано'
          todos={completedToDos}
          id='completed'
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
    </DragDropContext>
  );
};

export default TasksCategories;
