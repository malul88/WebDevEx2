import React from "react";
import "./FinalResult.css";

interface FinalResultProps {
  isWinner: boolean;
}

export const FinalResult: React.FC<FinalResultProps> = ({ isWinner }) => {
  return (
    <div className={`final-result ${isWinner ? "win" : "loss"}`}>
        <h1>{isWinner ? "Congratulations, You Won!" : "You lost, Better luck next time!"}</h1>
    </div>
  );
};
