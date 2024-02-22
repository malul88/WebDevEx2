import React from 'react';
import './BattlePokeMoves.css';
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
        return  <div> Loading ...</div>;
    }
    return (
        <div style={{display: 'flex'}}>
            <div className='selected-poke'>
                <p>{pokemon.name}</p>
                <img
                    src={pokemon?.imageUrl}
                    alt={pokemon?.name}
                />
            </div>
            <div>
                <div className='moves' >
                    <h4>{isOpponent ? 'Opponent moves' : 'Your moves'}</h4>
                    <ul>
                        {selectedMoves.map((move) => (
                            <button
                                key={move.name}
                                onClick={() => !isOpponent && handleMoveSelection(move)}
                                disabled={isOpponent || selectedMove !== null}
                                style={{ marginRight: '10px' }}
                            >
                                {move.name} ({move.power})
                            </button>
                        ))}
                    </ul>
                </div>
            </div>
        </div>    
    );
};





export default BattlePokeMoves;