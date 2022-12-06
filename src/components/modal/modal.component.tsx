import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
//@ts-ignore
import * as DateJS from 'datejs';

import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import ToDoItemCard from '../to-do-item-card/to-do-item-card.component';
import ToDoForm from '../to-do-form/to-do-form.component';

import './modal.styles.scss';
import { editItem, sendTodo, TO_DO_STATUS } from '../../api/api';
import { ModalProps } from './types';
import { FilesType } from '../to-do-form/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setTodos } from '../../store/todos/todos.action';
import { todosReducer } from '../../store/todos/todos.reducer';

const defaultFormFields = {
  title: '',
  description: '',
  expiryDate: Date.today().toString('yyyy-MM-dd'),
  priority: 'низкий',
  parentTodo: '',
};

const Modal = (props: ModalProps) => {
  const { data, isOpen, onClose, modalType, setModalType } = props;
  const heading = props?.heading;

  const [updatedFiles, setUpdatedFiles] = useState<FilesType[]>([]);

  const { projectId } = useParams();

  useEffect(() => {
    if (modalType === 'creating') {
      setFormFields((prev) => ({ ...prev, parentTodo: data.id }));
      return;
    }

    setFormFields({
      title: data.title,
      description: data.description,
      expiryDate: data.expiryDate,
      priority: data.priority,
      //@ts-ignore
      files: [],
      parentTodo: data.parentTodo,
    });

    setUpdatedFiles(data.files);
  }, [data]);

  const dispatch = useAppDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  //@ts-ignore
  const { title, description, expiryDate, files, priority, parentTodo } =
    formFields;

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

    let formData = {};

    if (modalType === 'editing') {
      formData = await editItem(data.id, {
        title,
        description,
        expiryDate,
        projectId,
        priority,
        status:
          data.status === TO_DO_STATUS.COMPLETED
            ? TO_DO_STATUS.COMPLETED
            : TO_DO_STATUS.IN_PROGRESS,
        files: [...files, ...updatedFiles],
      });
    }

    if (modalType === 'creating') {
      formData = await sendTodo({
        title,
        description,
        expiryDate,
        status: TO_DO_STATUS.IN_PROGRESS,
        files,
        projectId,
        priority,
        parentTodo,
        createDate: Date.today().toString('yyyy-MM-dd'),
      });
    }

    dispatch(setTodos(formData));

    setModalType('view');

    onClose();
  };

  const modalContent =
    modalType === 'view' ? (
      <ToDoItemCard data={data} setModalType={setModalType} />
    ) : (
      <ToDoForm
        heading={heading || 'Только не отодвигай дедлайн!'}
        formFields={formFields}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        formName={modalType}
        buttonText='Сохранить'
        updatedFiles={updatedFiles}
        setUpdatedFiles={setUpdatedFiles}
        min={expiryDate || Date.today().toString('yyyy-MM-dd')}
      />
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
