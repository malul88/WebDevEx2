// HomePage.tsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pokemon from '../../modules/Pokemon';
import PokemonList from '../PokemonList/PokemonList';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import { StartOver } from '../StartOver/StartOver';
import { LetsBattle } from '../LetsBattle/LetsBattle';
import './Home.css';
import { ClipLoader } from 'react-spinners';
import UserContext from '../../modules/UserDataContext';
import { PLayerStats } from '../PlayerStats/PlayerStats';
import User from '../../modules/User';



const HomePage: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(UserContext);
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);

  // Set loading to false when user data is available
  useEffect(() => {
    console.log(`HomePage useEffect called user: ${user}`);
    if (user) {
      console.log('user exists');
      setLoading(false);
      setPokemons(user.pokemons);
      console.log(`user.pokemons: ${user.pokemons}`);
    }
  }
    , [user, pokemons]);

  // navigator hook
  const navigate = useNavigate();

  const handleLetsBattle = async () => {
    if (user) {
      // get 3 random pokemons and store in local storage
      const opponentPokemons = await User.get3RandomPokemon();
      user.opponentPokemons = opponentPokemons;
      Pokemon.savePokemons("opponentPokemons", opponentPokemons);
    }
    navigate('/battle');
  };

  // Handle pokemon click
  // Set the selected pokemon to the clicked pokemon
  // If the clicked pokemon is already selected, deselect it
  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(prev => prev === pokemon ? null : pokemon);
  };

  const handleStartOver = () => {
    if (user) {
      setLoading(true);
      const resetUser = async () => {
        const updatedUser = await user.resetUserData();
        setUser(null);
        setUser(updatedUser);
        setPokemons(updatedUser.pokemons);
      };
      resetUser();
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>My Pokemon</h2>
      <StartOver handleStartOver={handleStartOver} />
      <div>
        {loading || !user || !pokemons ? (
          <ClipLoader color={'#000000'} loading={loading} size={150} />
        ) : (
          <PokemonList pokemonData={pokemons} handlePokemonClick={handlePokemonClick} />
        )}
      </div>
      <div>
        {selectedPokemon && (
          <PokemonDetails pokemon={selectedPokemon} />
        )}
      </div>
      <LetsBattle handleLetsBattle={handleLetsBattle} />
      {user && <PLayerStats user={user} />}
    </div>
  );
};

export default HomePage;