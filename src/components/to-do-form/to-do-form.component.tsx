import React from 'react';
import 'datejs';

import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import TextField from '../text-field/text-field.component';
import Button from '../button/button.component';

import './to-do-form.styles.scss';
import { FilesType, ToDoFormProps } from './types';

const ToDoForm = (props: ToDoFormProps) => {
  const {
    heading,
    formName,
    formFields,
    handleFormSubmit,
    handleInputChange,
    buttonText,
    updatedFiles = [],
    min,
    setUpdatedFiles = () => {},
  } = props;

  const { title, description, expiryDate, priority } = formFields;

  const handleFileRemoval = (event: React.MouseEvent<SVGSVGElement>) => {
    const { id } = event.target as SVGSVGElement;

    const modifiedFiles = updatedFiles.filter((file: FilesType) => {
      return file.id !== id;
    });

    setUpdatedFiles(modifiedFiles);
  };

  return (
    <>
      <h1 className='to-do-form__title title'>{heading}</h1>
      <form className='to-do-form' onSubmit={handleFormSubmit}>
        <TextField
          type='text'
          id={`${formName}-to-do-title`}
          name='title'
          label='* Интересное название:'
          value={title}
          onChange={handleInputChange}
        />
        <TextField
          type='textarea'
          id={`${formName}-to-do-description`}
          name='description'
          label='Подробное описание:'
          value={description}
          onChange={handleInputChange}
        />
        <TextField
          type='datetime-local'
          id={`${formName}-to-do-date`}
          name='expiryDate'
          label='* Обещаю сделать до:'
          value={expiryDate || min}
          onChange={handleInputChange}
          min={min}
          max={Date.today().add(2).year().toString('yyyy-MM-ddTHH:mm')}
        />
        <TextField
          name='priority'
          options={[
            { name: 'высокий', value: 'high' },
            { name: 'средний', value: 'middle' },
            { name: 'низкий', value: 'low' },
          ]}
          value={priority}
          onChange={handleInputChange}
          label='Приоритет задачи'
          id={`${formName}-to-do-priority`}
          type='select'
        />
        <TextField
          type='file'
          id={`${formName}-to-do-file`}
          name='files'
          label='Прикрепите очень нужные файлы:'
          onChange={handleInputChange}
          multiple={true}
        />
        {updatedFiles.length > 0 && (
          <ul className='to-do-form__list'>
            {updatedFiles.map(({ id, name }) => (
              <li key={id} className='to-do-form__list-item'>
                {name}
                <CloseIcon onClick={handleFileRemoval} id={id} />
              </li>
            ))}
          </ul>
        )}
        <div className='to-do-form__actions'>
          <Button text={buttonText} disabled={!title} />
        </div>
      </form>
    </>
  );
};

export default ToDoForm;
