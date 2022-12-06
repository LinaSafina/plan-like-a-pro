import { useState } from 'react';

import { ReactComponent as CommentIcon } from '../../assets/comment.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye.svg';
import { ReactComponent as BinIcon } from '../../assets/bin.svg';

import { CommentProps } from './types';
import './comment.style.scss';
import NewCommentForm from '../new-comment-form/new-comment-form.component';
import { deleteComment, getComments } from '../../api/api';
import { CommentsType } from '../../store/comments/comments.reducer';
import Comments from '../comments/comments.component';
import CommentsList from '../comments-list/comments-list.component';
import { setComments } from '../../store/comments/comments.action';
import { useAppDispatch } from '../../store/hooks';

const Comment = (props: CommentProps) => {
  const { text, taskId, id, parentId } = props;

  const [isCommenting, setIsCommenting] = useState(false);
  const [areSubCommentsShown, setAreSubCommentsShown] = useState(false);

  const dispatch = useAppDispatch();

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
    const data = await deleteComment(id, parentId);

    //@ts-ignore
    dispatch(setComments(data));

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
