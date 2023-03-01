import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import 'datejs';

import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import ToDoItemCard from '../to-do-item-card/to-do-item-card.component';
import ToDoForm from '../to-do-form/to-do-form.component';

import './modal.styles.scss';
import { TO_DO_RELEVANCE, TO_DO_STATUS } from '../../api/api';
import { ModalProps } from './types';
import { FilesType } from '../to-do-form/types';
import { createTodoStart, editTodoStart } from '../../store/todos/todos.action';

const defaultFormFields = {
  title: '',
  description: '',
  expiryDate: Date.today().setTimeToNow().toString('yyyy-MM-ddTHH:mm'),
  priority: 'низкий',
  parentTodo: '',
  files: [],
};

const Modal = (props: ModalProps) => {
  const { data, isOpen, onClose, modalType, setModalType } = props;
  const heading = props?.heading;

  const [updatedFiles, setUpdatedFiles] = useState<FilesType[]>([]);

  const { projectId } = useParams();

  const [formFields, setFormFields] = useState(defaultFormFields);

  const { title, description, expiryDate, files, priority, parentTodo } =
    formFields;

  useEffect(() => {
    if (modalType === 'creating') {
      setFormFields(() => {
        return { ...defaultFormFields, parentTodo: data.id };
      });
      return;
    }

    setFormFields({
      title: data.title,
      description: data.description,
      expiryDate: data.expiryDate,
      priority: data.priority,
      files: [],
      parentTodo: data.parentTodo,
    });

    setUpdatedFiles(data.files);
  }, [data, modalType]);

  const dispatch = useDispatch();

  const modalClasses = `modal to-do-card ${isOpen ? 'shown' : ''}`;
  const overlayClasses = `overlay ${isOpen ? 'shown' : ''}`;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;

    if (type === 'file') {
      let filesArr: FilesType[] = [];

      for (let key in event.target.files) {
        if (!isNaN(parseInt(key))) {
          filesArr.push({
            id: key,
            name: event.target.files[parseInt(key)].name,
          });
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

    if (modalType === 'editing') {
      dispatch(
        editTodoStart(
          data.id,
          {
            title,
            description,
            expiryDate,
            projectId,
            priority,
            status: data.status,
            files: [...files, ...updatedFiles],
          },
          projectId
        )
      );
    }

    if (modalType === 'creating') {
      dispatch(
        createTodoStart(
          {
            title,
            description,
            expiryDate,
            status: TO_DO_STATUS.QUEUE,
            files,
            projectId: projectId || '',
            priority,
            parentTodo,
            relevance: TO_DO_RELEVANCE.ACTIVE,
            createDate: Date.today()
              .setTimeToNow()
              .toString('yyyy-MM-ddTHH:mm'),
          },
          projectId
        )
      );
    }

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
        min={
          expiryDate || Date.today().setTimeToNow().toString('yyyy-MM-ddTHH:mm')
        }
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
