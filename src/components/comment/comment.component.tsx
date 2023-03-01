import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as CommentIcon } from '../../assets/comment.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye.svg';
import { ReactComponent as BinIcon } from '../../assets/bin.svg';
import NewCommentForm from '../new-comment-form/new-comment-form.component';
import CommentsList from '../comments-list/comments-list.component';

import { CommentProps } from './types';
import './comment.style.scss';
import { deleteCommentStart } from '../../store/comments/comments.action';

const Comment = (props: CommentProps) => {
  const { text, taskId, id, parentId } = props;

  const [isCommenting, setIsCommenting] = useState(false);
  const [areSubCommentsShown, setAreSubCommentsShown] = useState(false);

  const dispatch = useDispatch();

  const addCommentHandler = () => {
    setIsCommenting(true);
  };

  const cancelCommentingHandler = () => {
    setIsCommenting(false);
  };

  const showCommentsHandler = async () => {
    setAreSubCommentsShown((prevState) => !prevState);
  };

  const deleteCommentHandler = async () => {
    dispatch(deleteCommentStart(id, parentId));

    // console.log('data', data);

    // dispatch(createCommentStart(data));

    setAreSubCommentsShown(false);
  };

  return (
    <>
      <div className='comment'>
        <p className='comment__text'>{text}</p>
        <div className='comment__actions'>
          <div className='comment__action-item' onClick={addCommentHandler}>
            <CommentIcon />
            <span>Комментировать</span>
          </div>
          <div className='comment__action-item' onClick={showCommentsHandler}>
            <EyeIcon />
            <span>
              {areSubCommentsShown
                ? 'Скрыть комментарии'
                : 'Показать комментарии'}
            </span>
          </div>
          <div className='comment__action-item' onClick={deleteCommentHandler}>
            <BinIcon />
            <span>Удалить</span>
          </div>
        </div>
      </div>
      {areSubCommentsShown && <CommentsList parentId={id} />}
      {isCommenting && (
        <NewCommentForm
          taskId={taskId}
          cancelButton={true}
          onCancel={cancelCommentingHandler}
          parentId={id}
        />
      )}
    </>
  );
};

export default Comment;
