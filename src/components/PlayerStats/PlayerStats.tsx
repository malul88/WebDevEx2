import React from "react";
import User from "../../modules/User";
import "./PlayerStats.css";


type PLayerStatsProps = {
    user: User | null;
}

export const PLayerStats: React.FC<PLayerStatsProps> = ({ user }) => {
    if (!user) {
        return null;
    }
    const wins = user.wins;
    const losses = user.losses;
    const totalGames = wins + losses;
    return totalGames > 0 ? (
        <div className="user-stats">
            <h4>Player Status</h4>
            <p>you won {wins} out of {totalGames} battles {user.losses !== 0 ? ((wins / totalGames) * 100).toFixed(1) : (user.wins > 0 ? 100 : 0)}%</p>
        </div>
    ) : 
    (
        <div className="user-stats">
            <h4>Player Stats</h4>
            <p>No battles played yet</p>
        </div>
    )
};