// PokemonList.tsx
import React from 'react';
import Pokemon from '../../modules/Pokemon';
import './PokemonList.css';
import PokeAvatar from '../PokeAvatar/PokeAvatar';


interface PokemonListProps {
  pokemonData: Pokemon[];
  handlePokemonClick: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonData, handlePokemonClick }) => {
  console.log('PokemonList called');
  console.log(pokemonData);

  return (
    <div>
      <div className="left-column" >
        {pokemonData.map((pokemon, index) => (
          <PokeAvatar key={index} pokemon={pokemon} handlePokemonClick={handlePokemonClick} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
