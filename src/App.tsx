import CommentBlock from "components/CommentBlock/CommentBlock";
import Reply from "components/Reply/Reply";
import { useComments } from "context/CommentsContext";

function App() {
  const { commentsData } = useComments();

  return (
    <>
      {commentsData.comments.map((comment) => (
        <CommentBlock
          key={comment.id}
          currentUser={commentsData.currentUser}
          id={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          user={comment.user}
          replies={comment.replies}
        />
      ))}
      <Reply currentUser={commentsData.currentUser} />
    </>
  );
}

export default App;
