import { useEffect, useState } from 'react';

import Button from '../button/button.component';
import TextField from '../text-field/text-field.component';
import Comment from '../comment/comment.component';

import './comments.style.scss';
import { CommentsProps } from './types';
import { getComments, sendComment } from '../../api/api';
import NewCommentForm from '../new-comment-form/new-comment-form.component';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setComments } from '../../store/comments/comments.action';
import { selectAllComments } from '../../store/comments/comments.selector';
import CommentsList from '../comments-list/comments-list.component';

const Comments = (props: CommentsProps) => {
  const { taskId } = props;

  return (
    <div className='comments'>
      <NewCommentForm taskId={taskId} parentId={taskId} />
      <CommentsList parentId={taskId} taskId={taskId} />
    </div>
  );
};

export default Comments;
