// BattlePokes.tsx
import React from 'react';
import Pokemon from '../../modules/Pokemon';
import PokeAvatar from '../PokeAvatar/PokeAvatar';
import './BattlePokes.css';

interface BattlePokesProps {
  pokemonData: Pokemon[];
  handlePokemonClick: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<BattlePokesProps> = ({ pokemonData, handlePokemonClick }) => {
  console.log('battlePokes called');
  console.log(pokemonData);

  return (
    <div>
      <div className="battle-row" >
        {pokemonData.map((pokemon, index) => (
          <PokeAvatar key={index} pokemon={pokemon} handlePokemonClick={handlePokemonClick} displayName />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
