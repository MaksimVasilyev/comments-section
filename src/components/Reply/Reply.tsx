import styles from "components/Reply/Reply.module.scss";
interface ReplyProps {
  replyingTo?: string;
  currentUser: { image: { png: string; webp: string }; username: string };
  isReply?: boolean;
  editedText?: string;
}

const Reply: React.FC<ReplyProps> = ({
  currentUser,
  replyingTo,
  isReply,
  editedText,
}) => {
  return (
    <div
      style={isReply ? { width: "642px" } : { width: "730px" }}
      className={styles.mainContainer}
    >
      <div className={styles.avatarContainer}>
        <img src={currentUser.image.png} alt="avatar" />
      </div>
      <textarea
        className={styles.replyText}
        value={replyingTo ? `@${replyingTo} ${editedText}` : editedText}
      >
        {editedText}
      </textarea>
      <button className={styles.replyButton}>
        {isReply ? "REPLY" : "SEND"}
      </button>
    </div>
  );
};

export default Reply;
