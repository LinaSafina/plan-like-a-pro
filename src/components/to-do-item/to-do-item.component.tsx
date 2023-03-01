import 'datejs';
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/bin.svg';
import { ReactComponent as DoneIcon } from '../../assets/done.svg';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';

import './to-do-item.styles.scss';
import { TO_DO_RELEVANCE, TO_DO_STATUS } from '../../api/api';
import { ToDoItemProps } from './types';
import { deleteTodoStart, editTodoStart } from '../../store/todos/todos.action';

const ToDoItem = (props: ToDoItemProps) => {
  const {
    text,
    id,
    status,
    handleModalOpen,
    relevance,
    setModalType,
    parentTodo,
    index,
  } = props;

  const dispatch = useDispatch();

  const { projectId } = useParams();

  const handleItemClick = async (event: React.MouseEvent<HTMLLIElement>) => {
    const { tagName } = event.target as HTMLLIElement;

    if (tagName === 'LI' || tagName === 'SPAN') {
      handleModalOpen();
    }
  };

  const handleItemDeletion = async () => {
    dispatch(deleteTodoStart(id, projectId));
  };

  const handleItemCompletion = async () => {
    const newStatus =
      status === TO_DO_STATUS.COMPLETED
        ? TO_DO_STATUS.IN_PROGRESS
        : TO_DO_STATUS.COMPLETED;

    dispatch(editTodoStart(id, { status: newStatus }, projectId));
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

  if (
    relevance === TO_DO_RELEVANCE.EXPIRED &&
    status !== TO_DO_STATUS.COMPLETED
  ) {
    todoItemClasses += 'expired';
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
