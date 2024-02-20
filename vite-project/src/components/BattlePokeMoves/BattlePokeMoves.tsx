import React from 'react';
import Pokemon from '../../modules/Pokemon';

interface BattlePokeMovesProps {
    pokemon: Pokemon | null;
    opponent: Pokemon | null;
  }


const BattlePokeMoves: React.FC<BattlePokeMovesProps> = ({ pokemon, opponent }) => {
    return (
        <div style={{display: 'flex'}}>
            <div>
                <p>{pokemon.name}</p>
                <img
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    style={{ width: "90%", height: "90%", margin: "20px", cursor: "pointer" }}
                />
            </div>
            <div>
                {pokemon.moves.map((move, index) => (
                    <button key={index}>
                    {move.name} ({(move.power + pokemon.attack) *1 - opponent.defense})
                    </button>
                ))}
            </div>
        </div>    
    );
};

export default BattlePokeMoves;