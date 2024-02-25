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
    if (!opponentSelectedMove || !userSelectedMove) {
        return null;
    }

    useEffect(() => {
        const opponentDelay = 1000; // 1 second delay for opponent stats
        const userDelay = 2000; // 2 seconds delay for user stats

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
                <h4 style={{margin: "5px", fontWeight: "bold", fontSize: "20px" }}>Opponent's move</h4>
                <p style={{ margin: "5px" }}>{opponentSelectedMove?.name}</p>
                <p style={{ margin: "5px" }}>Damage: {opponentTotalDamage}</p>
                </div>

                <div className={`user-results ${showUserResults ? "show" : ""}`}>
                    <p className="arrows"> VS </p>
                    <h4 style={{margin: "5px", fontWeight: "bold", fontSize: "20px" }}>Your move</h4>
                    <p style={{ margin: "5px" }}>{userSelectedMove?.name}</p>
                    <p style={{ margin: "5px" }}>Damage: {userTotalDamage}</p>
                </div>
                <div className={`winner ${showFinalResults ? "show" : ""}`}>
                    <h2>{results}</h2>
                    {userTotalDamage > opponentTotalDamage ? (
                        <span role="img" aria-label="smiling emoji">😊</span>
                    ) : (
                        <span role="img" aria-label="sad emoji">😢</span>
                    )}
                </div>
        </div>
    );
}