import { Comment } from "context/CommentsContext";

export default function getLastId(comments: Comment[]): number {
  let maxId = 0;

  comments.forEach((comment) => {
    if (comment.id > maxId) {
      maxId = comment.id;
    }
    if (comment.replies) {
      comment.replies.forEach((reply) => {
        if (reply.id > maxId) {
          maxId = reply.id;
        }
      });
    }
  });

  return maxId;
}