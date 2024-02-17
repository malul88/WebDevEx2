// PokemonList.tsx
import React from 'react';
import Pokemon from '../../modules/Pokemon';


interface PokemonListProps {
  pokemonData: Pokemon[];
  handlePokemonClick: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonData, handlePokemonClick }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {pokemonData.slice(0, 3).map((pokemon) => (
          <img
            // key={pokemon.id}
            src={pokemon.imageUrl}
            alt={pokemon.name}
            style={{ width: '100px', height: '100px', margin: '10px', cursor: 'pointer' }}
            onClick={() => handlePokemonClick(pokemon)}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
