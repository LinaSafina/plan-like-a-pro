import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import ToDoItemCard from '../to-do-item-card/to-do-item-card.component';
import ToDoForm from '../to-do-form/to-do-form.component';

import './modal.styles.scss';
import { editItem, TO_DO_STATUS } from '../../api/api';
import { ModalProps } from './types';
import { FilesType } from '../to-do-form/types';
import { useAppDispatch } from '../../store/hooks';
import { setTodos } from '../../store/todos/todos.action';

const defaultFormFields = {
  title: '',
  description: '',
  expiryDate: '',
};

const Modal = (props: ModalProps) => {
  const { data, isOpen, onClose, isEdited, setIsEdited } = props;

  const [updatedFiles, setUpdatedFiles] = useState<FilesType[]>([]);

  useEffect(() => {
    setFormFields({
      title: data.title,
      description: data.description,
      expiryDate: data.expiryDate,
      //@ts-ignore
      files: [],
    });

    setUpdatedFiles(data.files);
  }, [data]);

  const dispatch = useAppDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  //@ts-ignore
  const { title, description, expiryDate, files } = formFields;

  const modalClasses = `modal to-do-card ${isOpen ? 'shown' : ''}`;
  const overlayClasses = `overlay ${isOpen ? 'shown' : ''}`;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;

    if (type === 'file') {
      let filesArr: FilesType[] = [];

      for (let key in event.target.files) {
        if (!isNaN(parseInt(key))) {
          //@ts-ignore
          filesArr.push({ id: key, name: event.target.files[key].name });
        }
      }

      setFormFields((prev) => ({ ...prev, [name]: filesArr }));
    } else {
      setFormFields((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      alert('Пожалуйста, введите название задачи');

      return;
    }

    const newData = await editItem(data.id, {
      title,
      description,
      expiryDate,
      status:
        data.status === TO_DO_STATUS.COMPLETED
          ? TO_DO_STATUS.COMPLETED
          : TO_DO_STATUS.IN_PROGRESS,
      files: [...files, ...updatedFiles],
    });

    dispatch(setTodos(newData));

    setIsEdited(false);

    onClose();
  };

  const modalContent = isEdited ? (
    <ToDoForm
      heading='Только не отодвигай дедлайн!'
      formFields={formFields}
      handleFormSubmit={handleFormSubmit}
      handleInputChange={handleInputChange}
      formName='edit'
      buttonText='Сохранить'
      updatedFiles={updatedFiles}
      setUpdatedFiles={setUpdatedFiles}
      min={expiryDate}
    />
  ) : (
    <ToDoItemCard data={data} setIsEdited={setIsEdited} />
  );

  return createPortal(
    <>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={modalClasses}>
        <CloseIcon onClick={onClose} />
        {modalContent}
      </div>
    </>,
    document.body
  );
};

export default Modal;
