import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ToDoItem from '../to-do-item/to-do-item.component';
import Modal from '../modal/modal.component';

import './to-do-list.styles.scss';
import { ToDoType } from '../modal/types';
import { useAppSelector } from '../../store/hooks';
import { selectAllTodos } from '../../store/todos/todos.selector';
import { ToDoListProps } from './types';

const ToDoList = (props: ToDoListProps) => {
  const { handleModalOpen, setModalType, heading, todos } = props;

  // const { projectId } = useParams();
  console.log(todos);
  //@ts-ignore
  const todosList = todos.map((item) => {
    const { title, id, status, parentTodo } = item;

    return (
      <ToDoItem
        key={id}
        text={title}
        id={id}
        status={status}
        handleModalOpen={handleModalOpen.bind(null, item)}
        setModalType={setModalType}
        parentTodo={parentTodo}
      />
    );
  });

  return (
    <div className='tasks__category'>
      <h2 className='tasks__title'>{heading}</h2>
      {todos.length > 0 && <ul className='to-do-list'>{todosList}</ul>}
    </div>
  );
};

export default ToDoList;
