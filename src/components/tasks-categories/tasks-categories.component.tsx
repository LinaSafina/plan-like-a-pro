import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import ToDoList from '../to-do-list/to-do-list.component';
import Modal from '../modal/modal.component';

import { ToDoWithId } from '../modal/types';
import './tasks-categories.styles.scss';
import {
  selectQueueToDos,
  selectCompletedToDos,
  selectProgressToDos,
} from '../../store/todos/todos.selector';
import { TO_DO_RELEVANCE, TO_DO_STATUS } from '../../api/api';
import { editTodoStart } from '../../store/todos/todos.action';

const defaultChosenTodo = {
  title: '',
  description: '',
  expiryDate: Date.today().setTimeToNow().toString('yyyy-MM-ddTHH:mm'),
  files: [],
  id: '',
  status: TO_DO_STATUS.QUEUE,
  projectId: '',
  priority: 'низкий',
  parentTodo: '',
  createDate: '',
  relevance: TO_DO_RELEVANCE.ACTIVE,
};

const TasksCategories = () => {
  const [chosenToDo, setChosenToDo] = useState<ToDoWithId>(defaultChosenTodo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const queueToDos = useSelector(selectQueueToDos);
  const progressToDos = useSelector(selectProgressToDos);
  const completedToDos = useSelector(selectCompletedToDos);

  const dispatch = useDispatch();

  const { projectId } = useParams();

  const handleModalOpen = (item: ToDoWithId) => {
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

    dispatch(
      editTodoStart(
        draggableId,
        {
          status: destination.droppableId as TO_DO_STATUS,
        },
        projectId
      )
    );
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
            type='button'
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
