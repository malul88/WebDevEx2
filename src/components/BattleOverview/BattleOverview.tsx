import React from "react";
import Pokemon from "../../modules/Pokemon";
import BattlePokes from "../BattlePokes/BattlePokes";

type BattleOverviewProps = {
    userPokes: Pokemon[];
    opponentPokes: Pokemon[];
    alredySelectedUserPokes?: Pokemon[];
    alredySelectedOpponentPokes?: Pokemon[];
    handlePokemonClick: (pokemon: Pokemon) => void;
}

export const BattleOverview: React.FC<BattleOverviewProps> = ({ userPokes, opponentPokes, handlePokemonClick, alredySelectedUserPokes, alredySelectedOpponentPokes }) => {
    const handleOpponentPokemonClick = (pokemon: Pokemon) => {
        console.log(`Opponent Pokemon ${pokemon.name} clicked`);
    }

    return (
        <div className="battle-overview">
            <div className="opponent-pokes">
                <h4 style={{alignSelf: 'center'}}>Opponent Pokemons</h4>
                <BattlePokes pokemonData={opponentPokes} handlePokemonClick={handleOpponentPokemonClick} disabledPokes={alredySelectedOpponentPokes} />
            </div>
            <div style={
                {
                    height: "100px",
                }
            }>
                
            </div>
            <div className="user-pokes">
                <h4 style={{alignSelf: 'center'}}>Your Pokemons</h4>
                <BattlePokes pokemonData={userPokes} handlePokemonClick={handlePokemonClick} disabledPokes={alredySelectedUserPokes}/>
            </div>
        </div>
    );
}