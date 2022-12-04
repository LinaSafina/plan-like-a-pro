import { ReactComponent as EditIcon } from '../../assets/edit.svg';

import { TO_DO_STATUS } from '../../api/api';
import './to-do-item-card.styles.scss';
import { ToDoItemCardType } from './types';

const ToDoItemCard = (props: ToDoItemCardType) => {
  const { data, setIsEdited } = props;
  const { title, description, expiryDate, files, status } = data;

  const handleItemEditing = () => {
    setIsEdited(true);
  };

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
      <p className='to-do-item-card__description'>{description}</p>
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
          {`${expiryDate.slice(-2)}.${expiryDate.slice(
            -5,
            -3
          )}.${expiryDate.slice(0, 4)}`}{' '}
          <span className={statusClasses}>{status}</span>
        </p>
      </div>
    </div>
  );
};

export default ToDoItemCard;
