import styles from "components/Reply/Reply.module.scss";
interface ReplyProps {
  replyingTo?: string;
  currentUser: { image: { png: string; webp: string }; username: string };
  isReply?: boolean;
}

const Reply: React.FC<ReplyProps> = ({ currentUser, replyingTo, isReply }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.avatarContainer}>
        <img src={currentUser.image.png} alt="avatar" />
      </div>
      <textarea className={styles.replyText}>
        {replyingTo ? `@${replyingTo}` : ""}
      </textarea>
      <button className={styles.replyButton}>
        {isReply ? "REPLY" : "SEND"}
      </button>
    </div>
  );
};

export default Reply;
