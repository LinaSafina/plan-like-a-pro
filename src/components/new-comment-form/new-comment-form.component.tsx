import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCommentStart } from '../../store/comments/comments.action';

import Button from '../button/button.component';
import TextField from '../text-field/text-field.component';

import './new-comment-form.style.scss';
import { NewCommentFormProps } from './types';

const NewCommentForm = (props: NewCommentFormProps) => {
  const { taskId, cancelButton, parentId } = props;

  const [newComment, setNewComment] = useState('');

  const dispatch = useDispatch();

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewComment(event.target.value);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newComment) {
      return;
    }

    dispatch(
      createCommentStart(
        { text: newComment, taskId, parentId: parentId || taskId },
        parentId || ''
      )
    );

    setNewComment('');

    props.onCancel && props.onCancel();
  };

  return (
    <form className='comments__form' onSubmit={submitFormHandler}>
      <TextField
        id='new-comment'
        type='textarea'
        name='new-comment'
        label=''
        value={newComment}
        onChange={inputChangeHandler}
      />
      <Button
        className=' button--small'
        text='Добавить комментарий'
        disabled={!newComment}
      />
      {cancelButton && (
        <Button
          className=' button--small button--light'
          text='Отменить'
          onClick={props.onCancel}
        />
      )}
    </form>
  );
};

export default NewCommentForm;
