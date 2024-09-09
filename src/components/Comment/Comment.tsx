import styles from "components/Comment/Comment.module.scss";
import Rating from "components/Comment/Rating/Rating";
import Reply from "components/Reply/Reply";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import DeleteModal from "components/DeleteModal/DeleteModal";
import { useComments } from "context/CommentsContext";

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
      {isCurrentUser ? (
        <div onClick={handleEdit} className={styles.replyEditContainer}>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
              fill="#5357B6"
            />
          </svg>
          <p>Edit</p>
        </div>
      ) : (
        <div onClick={handleReply} className={styles.replyEditContainer}>
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
        <DeleteModal
          id = {id}
          onClose={() => setDeleteOpenIsOpen(false)}
        />
      )}
    </>
  );
};

export default Comment;
