import styles from "components/CommentBlock/CommentBlock.module.scss";
import Comment, { CommentProps } from "components/Comment/Comment";
import Reply from "components/Reply/Reply";

// {
//     "id": 1,
//     "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
//     "createdAt": "1 month ago",
//     "score": 12,
//     "user": {
//       "image": {
//         "png": "./images/avatars/image-amyrobson.png",
//         "webp": "./images/avatars/image-amyrobson.webp"
//       },
//       "username": "amyrobson"
//     },
//     "replies": []
//   },
interface CommentBlockProps {
  currentUser: { image: { png: string; webp: string }; username: string };
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: { image: { png: string; webp: string }; username: string };
  replies: Array<CommentProps>;
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
                key={reply.id}
                id={reply.id}
                content={reply.content}
                createdAt={reply.createdAt}
                score={reply.score}
                user={reply.user}
                isReply={true}
                replyingTo={reply.replyingTo}
              />
            ))}
          </div>
        </div>
      )}
      <Reply currentUser={currentUser} />
    </div>
  );
};

export default CommentBlock;
