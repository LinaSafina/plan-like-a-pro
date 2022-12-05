import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ToDoItem from '../to-do-item/to-do-item.component';
import Modal from '../modal/modal.component';

import './to-do-list.styles.scss';
import { ToDoType } from '../modal/types';
import { useAppSelector } from '../../store/hooks';
import { selectAllTodos } from '../../store/todos/todos.selector';

const defaultChosenTodo = {
  title: '',
  description: '',
  expiryDate: '',
  files: [],
  id: '',
  status: '',
  projectId: '',
};

const ToDoList = () => {
  const [chosenToDo, setChosenToDo] = useState<ToDoType>(defaultChosenTodo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const todos = useAppSelector(selectAllTodos);

  // const { projectId } = useParams();

  const handleModalOpen = (item: ToDoType) => {
    setChosenToDo(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setChosenToDo(defaultChosenTodo);
    setIsEdited(false);
  };

  //@ts-ignore
  const todosList = todos.map((item) => {
    const { title, id, status } = item;

    return (
      <ToDoItem
        key={id}
        text={title}
        id={id}
        status={status}
        handleModalOpen={handleModalOpen.bind(null, item)}
        setIsEdited={setIsEdited}
      />
    );
  });

  return (
    <>
      <ul className='to-do-list'>{todosList}</ul>
      <Modal
        data={chosenToDo}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isEdited={isEdited}
        setIsEdited={setIsEdited}
      />
    </>
  );
};

export default ToDoList;
