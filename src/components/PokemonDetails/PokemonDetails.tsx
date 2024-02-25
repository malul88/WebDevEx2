import React from 'react';
import Pokemon from '../../modules/Pokemon';
import './PokemonDetails.css';

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  return (
    <div className='poke-details'>
        <div>
            <h4 style={{ textDecoration: 'underline' }}>{pokemon.name}</h4>
            <p>Type: {pokemon.type}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Hp: {pokemon.hp}</p>
            <p>Attack: {pokemon.attack}</p>
            <p>Defense: {pokemon.defense}</p>
            <p>Speed: {pokemon.speed}</p>
            <p>SpecialAttack: {pokemon.specialAttack}</p>
            <p>SpecialDefense: {pokemon.specialDefense}</p>
        </div>
        <div className='win-loss'>
            <h4 style={{ textDecoration: 'underline' }}>stats</h4>
            <p>Wins: {pokemon.wins}</p>
            <p>Losses: {pokemon.losses}</p>
            <p>{pokemon.getWinLossRatio()} % Win Rate</p>
        </div>
    </div>
  );
};

export default PokemonDetails;