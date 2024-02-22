import React, { useEffect, useState } from "react";
import "./BattleResults.css";
import { Move } from "../../modules/Pokemon";

interface BattleResultsProps {
    opponentSelectedMove: Move | null;
    userSelectedMove: Move | null;
    opponentTotalDamage: number;
    userTotalDamage: number;
}

export const BattleResults: React.FC<BattleResultsProps> = ({ opponentSelectedMove, userSelectedMove, opponentTotalDamage, userTotalDamage }) => {
    const [showOpponentResults, setShowOpponentResults] = useState(false);
    const [showUserResults, setShowUserResults] = useState(false);
    const [showFinalResults, setShowFinalResults] = useState(false);

    useEffect(() => {
        const opponentDelay = 2000; // 1 second delay for opponent stats
        const userDelay = 3000; // 2 seconds delay for user stats

        const opponentTimer = setTimeout(() => {
            setShowOpponentResults(true);
        }, opponentDelay);

        const userTimer = setTimeout(() => {
            setShowUserResults(true);
        }, userDelay);

        const finalResultsTimer = setTimeout(() => {
            setShowFinalResults(true);
        }, userDelay + opponentDelay + 1000);

        return () => {
            clearTimeout(opponentTimer);
            clearTimeout(userTimer);
            clearTimeout(finalResultsTimer);
        };
    }, []);
    const results: string = userTotalDamage > opponentTotalDamage ? "You won!" : "You lost!";

    return (
        <div className="battle-results">
            <div className={`opponent-results ${showOpponentResults ? "show" : ""}`}>
                <h4>Opponent's move</h4>
                <p>{opponentSelectedMove?.name}</p>
                <p>Damage: {opponentTotalDamage}</p>
            </div>
            
            <div className={`user-results ${showUserResults ? "show" : ""}`}>
                <p className="arrows"> VS </p>
                <h4>Your move</h4>
                <p>{userSelectedMove?.name}</p>
                <p>Damage: {userTotalDamage}</p>
            </div>
            {showFinalResults && (
                <div className="winner">
                    <h2>{results}</h2>
                </div>
            )}
        </div>
    );
}