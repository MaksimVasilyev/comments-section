import styles from "components/Comment/Comment.module.scss";
import Rating from "components/Comment/Rating/Rating";
import Reply from "components/Reply/Reply";
import { useState } from "react";

export interface CommentProps {
  currentUser: { image: { png: string; webp: string }; username: string };
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo?: string;
  user: { image: { png: string; webp: string }; username: string };
  isReply?: boolean;
  isCurrentUser?: boolean;
}
const Comment: React.FC<CommentProps> = ({
  currentUser,
  id,
  content,
  createdAt,
  score,
  user,
  isReply = false,
  replyingTo,
  isCurrentUser,
}) => {
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = () => {
    setIsReplying(true);
  };

  return (
    <div className={styles.commentWithReplyContainer}>
      <div
        className={styles.mainContainer}
        style={isReply ? { width: "642px" } : { width: "730px" }}
      >
        <Rating score={score} onMinus={() => {}} onPlus={() => {}} />
        <div className={styles.contentContainer}>
          <div className={styles.userReplyContainer}>
            <div className={styles.userInfoContainer}>
              <div className={styles.avatarContainer}>
                <img src={user.image.png} alt="avatar" />
              </div>
              <p className={styles.userName}>{user.username}</p>
              {isCurrentUser && <div className={styles.youDiv}>you</div>}
              <p className={styles.date}> {createdAt}</p>
            </div>
            <div className={styles.deleteReplyContainer}>
              {isCurrentUser && (
                <div className={styles.deleteContainer}>
                  <svg
                    className={styles.deleteSvg}
                    width="12"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                      fill="#ED6368"
                    />
                  </svg>
                  <p>Delete</p>
                </div>
              )}
              <div onClick={handleReply} className={styles.replyContainer}>
                <svg
                  className={styles.replySvg}
                  width="14"
                  height="13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                    fill="#5357B6"
                  />
                </svg>
                <p>Reply</p>
              </div>
            </div>
          </div>
          <p
            style={isReply ? { width: "530px" } : { width: "618px" }}
            className={styles.commentText}
          >
            {replyingTo && (
              <span className={styles.replyingTo}>@{replyingTo} </span>
            )}
            {content}
          </p>
        </div>
      </div>

      {isReplying && <Reply currentUser={currentUser} isReply={isReply} />}
    </div>
  );
};

export default Comment;
