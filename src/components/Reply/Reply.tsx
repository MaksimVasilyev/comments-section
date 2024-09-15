import { useState } from "react";
import styles from "components/Reply/Reply.module.scss";
import { useMediaQuery } from "react-responsive";
import { useComments } from "context/CommentsContext";

interface ReplyProps {
  id?: number;
  replyingTo?: string;
  currentUser: { image: { png: string; webp: string }; username: string };
  isReply?: boolean;
  editedText?: string;
  onEdit?: () => void;
  onReply?: () => void;
}

const Reply: React.FC<ReplyProps> = ({
  currentUser,
  replyingTo,
  isReply,
  editedText = "",
  id,
  onEdit,
  onReply,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 375 });
  const [commentText, setCommentText] = useState(
    replyingTo ? `@${replyingTo} ` : editedText
  );
  const { addComment, editComment, addReply } = useComments();

  const handleClick = () => {
    if (!id) {
      addComment(commentText);
      setCommentText("");
    } else if (onEdit) {
      editComment(id, commentText);
      onEdit && onEdit();
    } else {
      addReply(id, commentText, replyingTo);
      onReply && onReply();
    }
  };

  return (
    <>
      {!isMobile ? (
        <div
          style={isReply ? { width: "642px" } : { width: "730px" }}
          className={styles.mainContainer}
        >
          <div className={styles.avatarContainer}>
            <img src={currentUser.image.png} alt="avatar" />
          </div>
          <textarea
            className={styles.replyText}
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder={replyingTo ? `@${replyingTo}` : ""}
          />
          <button onClick={handleClick} className={styles.replyButton}>
            {isReply ? "REPLY" : "SEND"}
          </button>
        </div>
      ) : (
        <div
          style={isReply ? { width: "325px" } : { width: "343px" }}
          className={styles.mainContainer}
        >
          <textarea
            className={styles.replyText}
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder={replyingTo ? `@${replyingTo}` : ""}
          />
          <div className={styles.mobileControllersContainer}>
            <div className={styles.avatarContainer}>
              <img src={currentUser.image.png} alt="avatar" />
            </div>
            <button onClick={handleClick} className={styles.replyButton}>
              {isReply ? "REPLY" : "SEND"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Reply;
