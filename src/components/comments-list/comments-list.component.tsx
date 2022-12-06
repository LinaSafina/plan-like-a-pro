import { useEffect } from 'react';

import Comment from '../comment/comment.component';

import { CommentsListProps } from './types';
import './comments-list.style.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllComments } from '../../store/comments/comments.selector';
import { getComments } from '../../api/api';
import { setComments } from '../../store/comments/comments.action';

const CommentsList = (props: CommentsListProps) => {
  const { parentId } = props;

  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectAllComments);

  useEffect(() => {
    getComments(parentId)
      .then((data) => {
        //@ts-ignore
        dispatch(setComments(data));
      })
      .catch((error) => console.log(error));
  }, []);

  let commentsList = (
    <p className='comments__list' style={{ fontSize: '1rem' }}>
      Нет комментариев
    </p>
  );

  if (comments[parentId]) {
    //@ts-ignore
    commentsList = comments[parentId].map(({ id, text, taskId, parentId }) => (
      <li key={id} className='comments__list-item'>
        <Comment text={text} taskId={taskId} id={id} parentId={parentId} />
      </li>
    ));
  }

  return <ul className='comments__list'>{commentsList}</ul>;
};

export default CommentsList;
