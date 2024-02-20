import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { BattleOverview } from "../BattleOverview/BattleOverview";
import BattlePokeMoves from "../BattlePokeMoves/BattlePokeMoves";
import UserContext from "../../modules/UserDataContext";
import User from "../../modules/User";
import Pokemon from "../../modules/Pokemon";
import { set } from "firebase/database";
// import { useNavigate } from "react-router-dom";
// import UserDataContext from "../../modules/UserDataContext";
// import Pokemon from "../../modules/Pokemon";


const BattlePage: React.FC = () => {
    const [stage, setStage] = useState<number>(1);
    const { user } = useContext(UserContext);
    const [userPokemons, setUserPokemons] = useState<Pokemon[] | null >(null);
    const [userSelectedPokes, setUserSelectedPokes] = useState<Pokemon[]>([]);
    const [opponentSelectedPokes, setOpponentSelectedPokes] = useState<Pokemon[]>([]);
    const [currUserPoke, setCurrUserPoke] = useState<Pokemon | null>(null);
    const [currOpponentPoke, setCurrOpponentPoke] = useState<Pokemon | null>(null);
    const [battleOver, setBattleOver] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [opponentPokemons, setOpponentPokemons] = useState<Pokemon[] | null>(Pokemon.loadPokemons("opponentPokemons"));
    const navigate = useNavigate();

    console.log('opponent pokemons');
    console.log(opponentPokemons);
    console.log(`user opponent pokemons: ${user?.opponentPokemons}`);
    
    const handlePokemonClick = (pokemon: Pokemon) => {
        if (userSelectedPokes.length < 3) {
            setUserSelectedPokes([...userSelectedPokes, pokemon]);
        }
        setCurrUserPoke(pokemon);
        // rand index for opponent poke 0..2
        const randIndex = Math.floor(Math.random() * 3);
        if (opponentPokemons !== null) {
        const opponentPokesToSelect = opponentPokemons.filter(poke => !opponentSelectedPokes.includes(poke));
        if (opponentPokesToSelect.length === 0) {
            console.log('no opponent pokes left to select');
            throw new Error('no opponent pokes left to select');
        }
        setOpponentSelectedPokes([...opponentSelectedPokes, opponentPokesToSelect[randIndex]]);
        setCurrOpponentPoke(opponentPokemons[randIndex]);
        }
        else {
            console.log('opponent pokemons not loaded');
            throw new Error('opponent pokemons not loaded');
        }
        setStage(2);

    }

    useEffect(() => {
        if (user) {
            setUserPokemons(user.pokemons);
            setIsLoaded(true);
        }
    }, [user]);

    if (stage === 1 && isLoaded && userPokemons && opponentPokemons) {
        return (
            <div>
                <h2>Choose your Pokemon</h2>
                <BattleOverview userPokes={userPokemons} opponentPokes={opponentPokemons} alredySelectedOpponentPokes={opponentSelectedPokes} alredySelectedUserPokes={userSelectedPokes} handlePokemonClick={handlePokemonClick} />
            </div>
        )
    } else if (stage === 2 && isLoaded) {
        return (
            <div>
                <h1>Battle</h1>
                <h5>Your Poke</h5>
                <BattlePokeMoves pokemon={currUserPoke} opponent={currOpponentPoke} />
                <h5>Opponent Poke</h5>
                <BattlePokeMoves pokemon={currOpponentPoke} opponent={currUserPoke} />
            </div>
        )
    }


}

export default BattlePage;
