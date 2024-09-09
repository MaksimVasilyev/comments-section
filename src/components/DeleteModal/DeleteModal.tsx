import styles from "components/DeleteModal/Delete.modal.module.scss";
import { useComments } from "context/CommentsContext";

interface DeleteModalProps {
  id: number;
  onClose: () => void;

}

const DeleteModal: React.FC<DeleteModalProps> = ({ id, onClose }) => {
  const { deleteComment } = useComments();
  const handleDelete = () => {
    deleteComment(id);
    onClose();
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.deleteHeading}>Delete comment</h1>
        <p className={styles.deleteText}>
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className={styles.buttonContainer}>
          <button onClick={onClose} className={styles.noButton}>
            NO, CANCEL
          </button>
          <button onClick={handleDelete} className={styles.yesButton}>
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
