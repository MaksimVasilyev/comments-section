import styles from "components/Comment/Rating/Rating.module.scss";

import { useState } from "react";

interface RatingProps {
  score: number;
  onPlus: (score: number) => void;
  onMinus: (score: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  score: initialScore,
  onPlus,
  onMinus,
}) => {
  const [score, setScore] = useState(initialScore);
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);
  const handlePlus = () => {
    if (!voteState) {
      setScore(score + 1);
      setVoteState("up");
      onPlus(score + 1);
    } else if (voteState === "up") return;
    else {
      setScore(score + 1);
      setVoteState(null);
      onPlus(score + 1);
    }
  };
  const handleMinus = () => {
    if (!voteState) {
      setScore(score - 1);
      setVoteState("down");
      onMinus(score - 1);
    } else if (voteState === "down") return;
    else {
      setScore(score - 1);
      setVoteState(null);
      onMinus(score - 1);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div onClick={handlePlus} className={styles.iconContainer}>
        <img src="/icon-plus.svg" alt="svg" />
      </div>
      <p className={styles.scoreText}>{score}</p>
      <div onClick={handleMinus} className={styles.iconContainer}>
        <img src="/icon-minus.svg" alt="svg" />
      </div>
    </div>
  );
};
export default Rating;
