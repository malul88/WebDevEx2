import React from 'react';
import Pokemon from '../../modules/Pokemon';

interface BattlePokeMovesProps {
    pokemon: Pokemon | null;
    opponent: Pokemon | null;
    tf: number | null;
  }


const BattlePokeMoves: React.FC<BattlePokeMovesProps> = ({ pokemon, opponent, tf }) => {
    if (!pokemon || !opponent || !tf) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{display: 'flex'}}>
            <div>
                {<p>{pokemon.name}</p>}
                <img
                    src={pokemon?.imageUrl}
                    alt={pokemon?.name}
                    style={{ width: "90%", height: "90%", margin: "20px", cursor: "pointer" }}
                />
            </div>
            <div>
                {pokemon && opponent && pokemon.moves.map((move, index) => (
                    <button key={index}>
                        {move.name} ({(move.power + pokemon.attack) * tf - opponent.defense})
                    </button>
                ))}
            </div>
        </div>    
    );
};

export default BattlePokeMoves;