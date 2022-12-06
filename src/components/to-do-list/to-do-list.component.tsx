import ToDoItem from '../to-do-item/to-do-item.component';

import './to-do-list.styles.scss';
import { ToDoListProps } from './types';
import { Droppable } from 'react-beautiful-dnd';

const ToDoList = (props: ToDoListProps) => {
  const { handleModalOpen, setModalType, heading, todos, id } = props;

  //@ts-ignore
  const todosList = todos.map((item, index) => {
    const { title, id, status, parentTodo } = item;

    return (
      <ToDoItem
        key={id}
        index={index}
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
      <Droppable droppableId={id}>
        {(provided) => (
          <ul
            className='to-do-list'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.length > 0 && todosList}
            {todos.length === 0 && (
              <li className='tasks__empty-list'>Нет задач</li>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default ToDoList;
