import './comments.style.scss';
import { CommentsProps } from './types';
import NewCommentForm from '../new-comment-form/new-comment-form.component';
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
