// BattlePokes.tsx
import React from 'react';
import Pokemon from '../../modules/Pokemon';
import PokeAvatar from '../PokeAvatar/PokeAvatar';
import './BattlePokes.css';

interface BattlePokesProps {
  pokemonData: Pokemon[];
  disabledPokes?: Pokemon[];
  handlePokemonClick: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<BattlePokesProps> = ({ pokemonData, handlePokemonClick , disabledPokes}) => {
  console.log('battlePokes called');
  console.log(pokemonData);
  return (
    <div>
      <div className="battle-row" >
        {pokemonData.map((pokemon, index) => (
          // check if the pokemon is disabled
          <PokeAvatar key={index} pokemon={pokemon} handlePokemonClick={handlePokemonClick} disabled={disabledPokes?.includes(pokemon)} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
