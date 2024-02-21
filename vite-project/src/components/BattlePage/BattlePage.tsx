import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { BattleOverview } from "../BattleOverview/BattleOverview";
import BattlePokeMoves from "../BattlePokeMoves/BattlePokeMoves";
import UserContext from "../../modules/UserDataContext";
import User from "../../modules/User";
import Pokemon from "../../modules/Pokemon";
import { set } from "firebase/database";
import ApiClient from "../../modules/ClientApi";
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
    const [userTF, setUserTF] = useState<number | null>(1);
    const [opponentTF, setOpponentTF] = useState<number | null>(1);
    const [opponentPokemons, setOpponentPokemons] = useState<Pokemon[] | null>(Pokemon.loadPokemons("opponentPokemons"));
    const navigate = useNavigate();

    console.log('opponent pokemons');
    console.log(opponentPokemons);
    console.log(`user opponent pokemons: ${user?.opponentPokemons}`);
    
    const handlePokemonClick = async(pokemon: Pokemon) => {
        if (userSelectedPokes.length < 3) {
            setUserSelectedPokes([...userSelectedPokes, pokemon]);
        }
        setCurrUserPoke(pokemon);
        // rand index for opponent poke 0..2
        console.log(`user poke name: ${pokemon.name}`);
        if (opponentPokemons !== null) {
            console.log(`opponent pokemons: ${opponentPokemons}`)
            const opponentPokesToSelect = opponentPokemons.filter(poke => !opponentSelectedPokes.includes(poke));
            console.log(`opponentPokesToSelect: ${opponentPokesToSelect}`);
            if (opponentPokesToSelect.length === 0) {
                console.log('no opponent pokes left to select');
                throw new Error('no opponent pokes left to select');
            }
            const randIndex = Math.floor(Math.random() * opponentPokesToSelect.length);
            console.log(`randIndex: ${randIndex}`);
            const opponentPoke = opponentPokesToSelect[randIndex];
            setOpponentSelectedPokes([...opponentSelectedPokes, opponentPoke]);
            setCurrOpponentPoke(opponentPoke);
            setUserTF(await ApiClient.getInstance().getTF(pokemon.type, opponentPoke.type));
            setOpponentTF(await ApiClient.getInstance().getTF(opponentPoke.type, pokemon.type));
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
                <BattlePokeMoves pokemon={currUserPoke} opponent={currOpponentPoke} tf={userTF} />
                
                <h5>Opponent Poke</h5>
                <BattlePokeMoves pokemon={currOpponentPoke} opponent={currUserPoke} tf={opponentTF} />
            </div>
        )
    }


}

export default BattlePage;
