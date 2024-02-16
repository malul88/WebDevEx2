// HomePage.tsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataContext from '../../modules/UserDataContext';
import Pokemon from '../../modules/Pokemon';


const HomePage: React.FC = () => {
  const { userData } = useContext(UserDataContext);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const navigate = useNavigate();

  const navigateToBattlePage = () => {
    navigate('/battle');
  };
  console.log('userData');
  console.log(userData);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(prev => prev === pokemon ? null : pokemon);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h1>My Pokemon</h1>
        {userData.pokemons.map((pokemon: Pokemon, index: number) => (
          <div key={index} onClick={() => handlePokemonClick(pokemon)}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
      {selectedPokemon && (
        <div>
          <h2>{selectedPokemon.name} Stats</h2>
          <p>HP: {selectedPokemon.hp}</p>
            <p>Attack: {selectedPokemon.attack}</p>
            <p>Defense: {selectedPokemon.defense}</p>
            <p>Speed: {selectedPokemon.speed}</p>
            <p>Type: {selectedPokemon.type}</p>
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            <p>Win/Loss Ratio: {selectedPokemon.getWinLossRatio()}</p>
          {/* Display other stats here */}
        </div>
      )}
      <div>
        <button onClick={navigateToBattlePage}>Go to Battle Page</button>
        <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
          <p>Wins: {userData.wins}</p>
          <p>Losses: {userData.losses}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;