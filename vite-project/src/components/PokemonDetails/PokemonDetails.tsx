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
            <h4>{pokemon.name}</h4>
            <p>HP: {pokemon.hp}</p>
            <p>Attack: {pokemon.attack}</p>
            <p>Defense: {pokemon.defense}</p>
            <p>Speed: {pokemon.speed}</p>
            <p>Type: {pokemon.type}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
        </div>
        <div style={{ marginTop: '20px'}}>
            <div style={{marginTop: '50px', marginLeft:'20px' ,padding: '5px', border: '1px solid black' }}>
                <p>Wins: {pokemon.wins}</p>
                <p>Losses: {pokemon.losses}</p>
                <p>{pokemon.getWinLossRatio()} % Win Rate</p>
            </div>
        </div>
    </div>
  );
};

export default PokemonDetails;