import styles from "components/Comment/Comment.module.scss";
import Rating from "components/Comment/Rating/Rating";
import Reply from "components/Reply/Reply";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import DeleteModal from "components/DeleteModal/DeleteModal";
import DeleteIcon from "icons/DeleteIcon";
import EditIcon from "icons/EditIcon";
import ReplyIcon from "icons/ReplyIcon";

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
  const isMobile = useMediaQuery({ maxWidth: 375 });
  const [isReplying, setIsReplying] = useState(false);
  const [deleteModalisOpen, setDeleteOpenIsOpen] = useState(false);
  const [isEdditing, setIsEdditing] = useState(false);

  const handleReply = () => {
    setIsReplying(true);
  };
  const closeReply = () => {
    setIsReplying(false);
  };
  const closeEdit = () => {
    setIsEdditing(false);
  };
  const handleDelete = () => {
    setDeleteOpenIsOpen(true);
  };

  const handleEdit = () => {
    setIsEdditing(true);
  };

  const ControlButtons = (
    <div className={styles.deleteReplyContainer}>
      {isCurrentUser && (
        <div onClick={handleDelete} className={styles.deleteContainer}>
          <DeleteIcon className={styles.deleteSvg} />
          <p>Delete</p>
        </div>
      )}
      {isCurrentUser ? (
        <div onClick={handleEdit} className={styles.replyEditContainer}>
          <EditIcon className={styles.replySvg} />
          <p>Edit</p>
        </div>
      ) : (
        <div onClick={handleReply} className={styles.replyEditContainer}>
          <ReplyIcon className={styles.replySvg} />

          <p>Reply</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {!isEdditing && (
        <div className={styles.commentWithReplyContainer}>
          <div
            className={styles.mainContainer}
            style={{
              width: isMobile
                ? isReply
                  ? "311px"
                  : "325px"
                : isReply
                ? "642px"
                : "730px",
            }}
          >
            {!isMobile && <Rating id={id} score={score} />}
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
                {!isMobile && ControlButtons}
              </div>
              <p
                // style={isReply ? { width: "530px" } : { width: "618px" }}
                style={{
                  width: isMobile
                    ? isReply
                      ? "293px"
                      : "311px"
                    : isReply
                    ? "530px"
                    : "618px",
                }}
                className={styles.commentText}
              >
                {replyingTo && (
                  <span className={styles.replyingTo}>@{replyingTo} </span>
                )}
                {content}
              </p>
              {isMobile && (
                <div className={styles.mobileRatingControlsContainer}>
                  <Rating id={id} score={score} />
                  {ControlButtons}
                </div>
              )}
            </div>
          </div>

          {isReplying && (
            <Reply
              onReply={closeReply}
              id={id}
              currentUser={currentUser}
              isReply={isReply}
              replyingTo={user.username}
            />
          )}
        </div>
      )}
      {isEdditing && (
        <Reply
          onEdit={closeEdit}
          id={id}
          currentUser={currentUser}
          isReply={isReply}
          editedText={content}
        />
      )}

      {deleteModalisOpen && (
        <DeleteModal id={id} onClose={() => setDeleteOpenIsOpen(false)} />
      )}
    </>
  );
};

export default Comment;
