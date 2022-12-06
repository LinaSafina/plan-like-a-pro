import Comment from '../comment/comment.component';

import { CommentsListProps } from './types';
import './comments-list.style.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllComments } from '../../store/comments/comments.selector';
import { useEffect, useState } from 'react';
import { getComments } from '../../api/api';
import { setComments } from '../../store/comments/comments.action';
import { CommentsProps } from '../comments/types';
import { CommentsType } from '../../store/comments/comments.reducer';

const CommentsList = (props: CommentsListProps) => {
  const { parentId, taskId } = props;

  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectAllComments);

  // const [comments, setComments] = useState<CommentsType>([]);

  // const dispatch = useAppDispatch();
  console.log(comments);

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
