import React from "react";
import Pokemon from "../../modules/Pokemon";
import "./PokeAvatar.css";

interface PokeAvatarProps {
  pokemon: Pokemon;
  handlePokemonClick: (pokemon: Pokemon) => void;
}

const PokeAvatar: React.FC<PokeAvatarProps> = ({ pokemon, handlePokemonClick }) => {
  console.log(`PokeAvatar: ${pokemon.name}`);
  return (
    <div className="poke-avatar">
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name}
        style={{ width: "90%", height: "90%", margin: "20px", cursor: "pointer" }}
        onClick={() => handlePokemonClick(pokemon)}
      />
    </div>
  );
};

export default PokeAvatar;