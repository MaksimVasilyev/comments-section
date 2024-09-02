import Comment from "components/Comment/Comment";
import Rating from "components/Comment/Rating/Rating";
import Reply from "components/Reply/Reply";
import CommentBlock from "components/CommentBlock/CommentBlock";
import DeleteModal from "components/DeleteModal/DeleteModal";
import { useState } from "react";

const commentData = {
  id: 2,
  content:
    "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
  createdAt: "2 weeks ago",
  score: 5,
  user: {
    image: {
      png: "/avatars/image-maxblagun.png",
      webp: "/avatars/image-maxblagun.webp",
    },
    username: "maxblagun",
  },
  replies: [
    {
      id: 3,
      content:
        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      createdAt: "1 week ago",
      score: 4,
      replyingTo: "maxblagun",
      user: {
        image: {
          png: "/avatars/image-ramsesmiron.png",
          webp: "/avatars/image-ramsesmiron.webp",
        },
        username: "ramsesmiron",
      },
    },
    {
      id: 4,
      content:
        "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      createdAt: "2 days ago",
      score: 2,
      replyingTo: "ramsesmiron",
      user: {
        image: {
          png: "/avatars/image-juliusomo.png",
          webp: "/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
    },
  ],
};

function App() {
  const [currentUser, setCurrentUser] = useState({
    image: {
      png: "/avatars/image-juliusomo.png",
      webp: "/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  });
  return (
    <CommentBlock
      currentUser={currentUser}
      id={commentData.id}
      content={commentData.content}
      createdAt={commentData.createdAt}
      score={commentData.score}
      user={commentData.user}
      replies={commentData.replies}
    />
    // <Comment
    //   id={commentData.id}
    //   content={commentData.content}
    //   createdAt={commentData.createdAt}
    //   score={commentData.score}
    //   user={commentData.user}
    //   isReply={true}
    // />
  );
}

export default App;
