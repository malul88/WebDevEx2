// HomePage.tsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pokemon from '../../modules/Pokemon';
import PokemonList from '../PokemonList/PokemonList';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import { StartOver } from '../StartOver/StartOver';
import './Home.css';
import { ClipLoader } from 'react-spinners';
import UserContext from '../../modules/UserDataContext';


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
    }
  }
  , [user, pokemons]);

  // navigator hook
  const navigate = useNavigate();

  const navigateToBattlePage = () => {
    navigate('/battle');
  };

  console.log('userData');
  console.log(user);

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
      <StartOver handleStartOver={handleStartOver}/>
      <div>
        {loading  || !user || !pokemons ? (
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
      <div>
        <button className='lets-battle'  onClick={navigateToBattlePage}>Lets Battle!</button>
      </div>
      <div className='user-stats'>
          <h2>My Stats</h2>
          {user && <p>you won {user.wins} out of {user.wins + user.losses} battles {user.losses !== 0 ? (user.wins / user.losses) * 100 : (user.wins > 0 ? 100 : 0)}%</p>}      </div>
    </div>
  );
};

export default HomePage;