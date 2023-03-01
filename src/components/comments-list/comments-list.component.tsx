import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Comment from '../comment/comment.component';

import { CommentsListProps } from './types';
import './comments-list.style.scss';
import { selectAllComments } from '../../store/comments/comments.selector';
import { fetchCommentsStart } from '../../store/comments/comments.action';

const CommentsList = (props: CommentsListProps) => {
  const { parentId } = props;

  const dispatch = useDispatch();
  const comments = useSelector(selectAllComments);

  useEffect(() => {
    dispatch(fetchCommentsStart(parentId));
  }, []);

  let commentsList: JSX.Element | JSX.Element[] = (
    <p className='comments__list' style={{ fontSize: '1rem' }}>
      Нет комментариев
    </p>
  );

  if (comments[parentId]) {
    commentsList = comments[parentId].map(({ id, text, taskId, parentId }) => (
      <li key={id} className='comments__list-item'>
        <Comment text={text} taskId={taskId} id={id} parentId={parentId} />
      </li>
    ));
  }

  return <ul className='comments__list'>{commentsList}</ul>;
};

export default CommentsList;
