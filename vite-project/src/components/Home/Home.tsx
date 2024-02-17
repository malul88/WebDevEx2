// HomePage.tsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataContext from '../../modules/UserDataContext';
import Pokemon from '../../modules/Pokemon';
import PokemonList from '../Home/PokemonList';
import PokemonDetails from './PokemonDetails';


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
    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', padding: '0px' }}>
      <h3>My Pokemon</h3>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <PokemonList pokemonData={userData.pokemons} handlePokemonClick={handlePokemonClick} />
        {selectedPokemon && (
          <PokemonDetails pokemon={selectedPokemon} />
        )}
      </div>
      <div>
        <button onClick={navigateToBattlePage}>Lets Battle!</button>
        <div style={{ border: '1px solid black', padding: '5px', marginTop: '5px' }}>
          <p>you won {userData.wins} out of {userData.wins + userData.losses} battles {userData.losses !== 0 ? (userData.wins / userData.losses) * 100 : (userData.wins > 0 ? 100 : 0)}%</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;