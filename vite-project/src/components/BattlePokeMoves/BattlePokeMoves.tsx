import React from 'react';
import Pokemon from '../../modules/Pokemon';
import { Move } from '../../modules/Pokemon';
import { useState } from 'react';

interface BattlePokeMovesProps {
    pokemon: Pokemon | null;
    selectedMoves: Move[] | null;
    onMoveSelected: (move: Move) => void;
    isOpponent: boolean;
  }


const BattlePokeMoves: React.FC<BattlePokeMovesProps> = ({ pokemon, selectedMoves, onMoveSelected, isOpponent}) => {
    
    const [selectedMove, setSelectedMove] = useState<Move | null>(null);

    const handleMoveSelection = (move: Move) => {
        setSelectedMove(move);
        onMoveSelected(move);
    };

    if (!pokemon || !selectedMoves) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{display: 'flex'}}>
            <div>
                <p>{pokemon.name}</p>
                <img
                    src={pokemon?.imageUrl}
                    alt={pokemon?.name}
                    style={{ width: "90%", height: "90%", margin: "20px", cursor: "pointer" }}
                />
            </div>
            <div>
                <ul>
                    console.log(isOpponent);
                    {selectedMoves.map((move) => (
                        <button key={move.name} onClick={() => handleMoveSelection(move)}>
                                {move.name} ({move.power}) disabled={isOpponent || selectedMove !== null}
                        </button>
                    ))}
                </ul>
            </div>
        </div>    
    );
};





export default BattlePokeMoves;