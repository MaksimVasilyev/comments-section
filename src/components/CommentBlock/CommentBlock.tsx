import styles from "components/CommentBlock/CommentBlock.module.scss";
import Comment, { CommentProps } from "components/Comment/Comment";
import Reply from "components/Reply/Reply";

interface CommentBlockProps {
  currentUser: { image: { png: string; webp: string }; username: string };
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: { image: { png: string; webp: string }; username: string };
  replies?: Omit<CommentProps, 'currentUser'>[];
}

const CommentBlock: React.FC<CommentBlockProps> = ({
  currentUser,
  id,
  content,
  createdAt,
  score,
  user,
  replies,
}) => {
  return (
    <div className={styles.mainContainer}>
      <Comment
        currentUser={currentUser}
        id={id}
        content={content}
        createdAt={createdAt}
        score={score}
        user={user}
      />
      {replies && replies.length > 0 && (
        <div className={styles.repliesContainer}>
          <div className={styles.verticalLine}></div>
          <div className={styles.replies}>
            {replies.map((reply) => (
              <Comment
                currentUser={currentUser}
                key={reply.id}
                id={reply.id}
                content={reply.content}
                createdAt={reply.createdAt}
                score={reply.score}
                user={reply.user}
                isReply={true}
                replyingTo={reply.replyingTo}
                isCurrentUser={currentUser.username === reply.user.username}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentBlock;
