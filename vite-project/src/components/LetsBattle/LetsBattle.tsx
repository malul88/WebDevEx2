import React from "react";
import './LetsBattle.css'

interface LetsBattleProps {
    handleLetsBattle: () => void;
}

export const LetsBattle: React.FC<LetsBattleProps> = ({ handleLetsBattle }) => {
    return (
        <div>
            <button className="lets-battle" onClick={handleLetsBattle}>Let's Battle!</button>
        </div>
    )
}