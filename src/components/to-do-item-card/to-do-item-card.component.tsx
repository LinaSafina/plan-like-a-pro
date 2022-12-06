import { useState } from 'react';

import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import Comments from '../comments/comments.component';

import { TO_DO_STATUS } from '../../api/api';
import './to-do-item-card.styles.scss';
import { ToDoItemCardType } from './types';
import { formatDate } from '../../util';

const ToDoItemCard = (props: ToDoItemCardType) => {
  const { data, setModalType } = props;
  const {
    title,
    description,
    expiryDate,
    files,
    status,
    id,
    createDate,
    priority,
  } = data;

  const [areCommentsShown, setAreCommentsShown] = useState(false);

  const handleItemEditing = () => {
    setModalType('editing');
  };

  const handleShowComments = () => {
    setAreCommentsShown((prevState) => !prevState);
  };

  //@ts-ignore
  const fileListContent = files.map((file) => (
    <li key={file.id} className='to-do-item-card__list-item'>
      {file.name}
    </li>
  ));

  let statusClasses = 'progress';

  if (status === TO_DO_STATUS.EXPIRED) {
    statusClasses = 'expired';
  }

  if (status === TO_DO_STATUS.COMPLETED) {
    statusClasses = 'completed';
  }

  return (
    <div className='to-do-item-card'>
      <EditIcon onClick={handleItemEditing} />
      <h2 className='to-do-item-card__title'>{title}</h2>
      <p className='to-do-item-card__subtitle'>
        Описание: <span>{description}</span>
      </p>
      <p className='to-do-item-card__subtitle'>
        Номер задачи: <span>{id}</span>
      </p>
      <p className='to-do-item-card__subtitle'>
        Дата создания: <span>{formatDate(createDate)}</span>
      </p>
      <p className='to-do-item-card__subtitle'>
        Время в работе: <span>{formatDate(createDate)}</span>
      </p>
      <p className='to-do-item-card__subtitle'>
        Приоритет: <span>{priority}</span>
      </p>
      <div className='to-do-item-card__files-wrapper'>
        <p className='to-do-item-card__subtitle'>Прикрепленные файлы:</p>
        {files.length > 0 && (
          <ul className='to-do-item-card__list'>{fileListContent}</ul>
        )}
        {files.length === 0 && (
          <span className='to-do-item-card__notification'>
            Видимо, для выполнения задачи не нужны файлы
          </span>
        )}
      </div>
      <div className='to-do-item-card__date-wrapper'>
        <p className='to-do-item-card__subtitle'>Пожалуйста, сделай до:</p>
        <p>
          {formatDate(expiryDate)}{' '}
          <span className={statusClasses}>{status}</span>
        </p>
      </div>
      <button
        className='to-do-item-card__button button button--light'
        type='button'
        onClick={handleShowComments}
      >
        {areCommentsShown ? 'Скрыть комментарии' : 'Показать комментарии'}
      </button>
      {areCommentsShown && <Comments taskId={id} />}
    </div>
  );
};

export default ToDoItemCard;
