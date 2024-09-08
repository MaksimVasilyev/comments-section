import React, { createContext, useState, useEffect, ReactNode } from "react";
import data from "../data/data.json";
import getLastId from "utils/getLastId";

type User = {
  image: { png: string; webp: string };
  username: string;
};

export type Comment = {
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

interface CommentsContextType {
  commentsData: CommentsData;
  setComments: React.Dispatch<React.SetStateAction<CommentsData>>;
  updateScore: (id: number, newScore: number) => void;
  addComment: (text: string) => void;
  deleteComment: (id: number) => void;
  editComment: (id: number, newText: string) => void;
  addReply: (id: number, replyText: string) => void;
}

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

const CommentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
  useEffect(() => {
    if (commentsData.comments.length > 0 || commentsData.currentUser.username) {
      localStorage.setItem("comments", JSON.stringify(commentsData));
    }
  }, [commentsData]);

  const updateScore = (id: number, newScore: number) => {
    setComments((prevData: CommentsData) => ({
      ...prevData,
      comments: prevData.comments.map((comment: Comment) => {
        if (comment.id === id) {
          return { ...comment, score: newScore };
        }

        if (comment.replies) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === id) {
              return { ...reply, score: newScore };
            }
            return reply;
          });
          return { ...comment, replies: updatedReplies };
        }

        return comment;
      }),
    }));
  };

  const addComment = (text: string) => {
    const lastId = getLastId(commentsData.comments); // Убедитесь, что getLastId возвращает корректный id
    const newId = lastId + 1;
    // const date = new Date().toString();
    const date = "few minutes ago";

    setComments((prevData: CommentsData) => ({
      ...prevData,
      comments: [
        ...prevData.comments,
        {
          id: newId,
          content: text,
          createdAt: date,
          score: 0,
          user: commentsData.currentUser,
          replies: [],
        },
      ],
    }));
  };

  const deleteComment = (id: number) => {
    const filterComments = (comments: Comment[]): Comment[] => {
      return comments
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          replies: comment.replies ? filterComments(comment.replies) : [],
        }));
    };

    setComments((prevData: CommentsData) => ({
      ...prevData,
      comments: filterComments(prevData.comments),
    }));
  };

  const editComment = (id: number, newText: string) => {
    setComments((prevData: CommentsData) => ({
      ...prevData,
      comments: prevData.comments.map((comment: Comment) => {
        if (comment.id === id) {
          return { ...comment, content: newText };
        }

        if (comment.replies) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === id) {
              return { ...reply, content: newText };
            }
            return reply;
          });
          return { ...comment, replies: updatedReplies };
        }

        return comment;
      }),
    }));
  };

  const addReply = (id: number, replyText: string) => {
    const lastId = getLastId(commentsData.comments);
    const newId = lastId + 1;
    const date = "few minutes ago";

    const newReply = {
      id: newId,
      content: replyText,
      createdAt: date,
      score: 0,
      user: commentsData.currentUser,
    };
    function addReplyById(
      comments: Comment[],
      id: number,
      newReply: Comment
    ): Comment[] {
      return comments.map((comment) => {
        
        if (comment.id === id) {
          return {
            ...comment,
            replies: comment.replies
              ? [...comment.replies, newReply]
              : [newReply],
          };
        }

        
        if (comment.replies) {
          const replyExists = comment.replies.some((reply) => reply.id === id);
          if (replyExists) {
            return {
              ...comment,
              replies: [...comment.replies, newReply], 
            };
          }
        }

       
        return comment;
      });
    }
    setComments((prevData) => ({
      ...prevData,
      comments: addReplyById(prevData.comments, id, newReply), 
    }));
  };

  return (
    <CommentsContext.Provider
      value={{
        commentsData,
        setComments,
        updateScore,
        addComment,
        deleteComment,
        editComment,
        addReply,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

const useComments = (): CommentsContextType => {
  const context = React.useContext(CommentsContext);
  if (context === undefined) {
    throw new Error("useComments must be used within a CommentsProvider");
  }
  return context;
};

export { CommentsProvider, useComments };
