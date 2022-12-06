//@ts-ignore
import * as DateJS from 'datejs';
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router';

import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/bin.svg';
import { ReactComponent as DoneIcon } from '../../assets/done.svg';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';

import './to-do-item.styles.scss';
import { deleteItem, editItem, TO_DO_STATUS } from '../../api/api';
import { ToDoItemProps } from './types';
import { useAppDispatch } from '../../store/hooks';
import { setTodos } from '../../store/todos/todos.action';

const ToDoItem = (props: ToDoItemProps) => {
  const { text, id, status, handleModalOpen, setModalType, parentTodo, index } =
    props;

  const dispatch = useAppDispatch();

  const { projectId } = useParams();

  const handleItemClick = async (event: React.MouseEvent<HTMLLIElement>) => {
    const { tagName } = event.target as HTMLLIElement;

    if (tagName === 'LI' || tagName === 'SPAN') {
      handleModalOpen();
    }
  };

  const handleItemDeletion = async () => {
    const data = await deleteItem(id, projectId);

    dispatch(setTodos(data));
  };

  const handleItemCompletion = async () => {
    const newStatus =
      status === TO_DO_STATUS.COMPLETED ? 'progress' : TO_DO_STATUS.COMPLETED;

    const data = await editItem(id, { status: newStatus }, projectId);

    dispatch(setTodos(data));
  };

  const handleItemEditing = () => {
    handleModalOpen();

    setModalType('editing');
  };

  const handleSubtaskAddition = () => {
    handleModalOpen();

    setModalType('creating');
  };

  let todoItemClasses = '';

  if (status === TO_DO_STATUS.EXPIRED) {
    todoItemClasses += status;
  }

  if (status === TO_DO_STATUS.COMPLETED) {
    todoItemClasses += status;
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className={`to-do-item list-item ${todoItemClasses} ${
            parentTodo ? 'to-do-item--subtask' : 'to-do-item--task'
          }`}
          onClick={handleItemClick}
          id={id}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {parentTodo && <div className='to-do-item__parent'>{parentTodo}</div>}
          <h3 className='to-do-item__title'>{text}</h3>
          <div className='to-do-item__actions'>
            <DeleteIcon onClick={handleItemDeletion} />
            <DoneIcon onClick={handleItemCompletion} />
            <PlusIcon onClick={handleSubtaskAddition} />
            <EditIcon onClick={handleItemEditing} />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ToDoItem;
