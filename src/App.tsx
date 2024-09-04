import CommentBlock from "components/CommentBlock/CommentBlock";
import Reply from "components/Reply/Reply";
import { useState, useEffect } from "react";
import data from "./data/data.json";
type User = {
  image: { png: string; webp: string };
  username: string;
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies?: Comment[];
};

type CommentsData = {
  currentUser: User;
  comments: Comment[];
};

function App() {
  const [commentsData, setComments] = useState<CommentsData>({
    currentUser: { image: { png: "", webp: "" }, username: "" },
    comments: [],
  });

  useEffect(() => {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      setComments(data);
    }

  }, []);

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
