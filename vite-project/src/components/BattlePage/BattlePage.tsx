import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { BattleOverview } from "../BattleOverview/BattleOverview";
import BattlePokeMoves from "../BattlePokeMoves/BattlePokeMoves";
import UserContext from "../../modules/UserDataContext";
import User from "../../modules/User";
import Pokemon from "../../modules/Pokemon";
import { set } from "firebase/database";
import ApiClient from "../../modules/ClientApi";
import { Move } from "../../modules/Pokemon";
import { BattleResults } from "../BattleResults/BattleResults";
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
    const [userSelectedMove, setUserSelectedMove] = useState<Move | null>(null);
    const [opponentSelectedMove, setOpponentSelectedMove] = useState<Move | null>(null);
    const [randomOpponentMoves, setRandomOpponentMoves] = useState<Move[]>([]);
    //const [battleResult, setBattleResult] = useState<number | null>(null);
    
    const getRandomMoves = (moves: Move[] | undefined, count: number ): Move[] => {
        // Shuffle moves array and select the first 4 moves
        if (!moves) {
            return [];
        }
        const shuffledMoves = moves.sort(() => Math.random() - 0.5);
        return shuffledMoves.slice(0, count);
    };

    const calculateTotalPower = (power: number, attack: number | undefined, oppDefense: number | undefined, tf: number): number => {
        if( attack === undefined || oppDefense === undefined)
            return 0;
        return (power + attack) * tf - oppDefense;
    };

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
            setRandomOpponentMoves(getRandomMoves(opponentPoke.moves, 4));
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

    const handleUserMoveSelection = (move: Move) => {
        setUserSelectedMove(move);
        
        // Randomly select opponent's move
        const opponentMove = getRandomMoves(randomOpponentMoves, 1)[0];
        handleOpponentMoveSelection(opponentMove);
        // sleep 6 seconds
    //     setTimeout(() => {
    //         const oppTotoalDamage = calculateTotalPower(opponentMove.power, currOpponentPoke?.attack, currUserPoke?.defense, opponentTF);
    //         const userTotalDamage = calculateTotalPower(move.power, currUserPoke?.attack, currOpponentPoke?.defense, userTF);
    //         const won = userTotalDamage > oppTotoalDamage;
    //         // update user and its pokemons wins and losses
    //         // if all 3 pokemons are selected then update the user and navigate to home
    //         // else navigate to battle

    // }, 6000);
    }

    
    const handleOpponentMoveSelection = (move: Move) => {

        setOpponentSelectedMove(move);
    
        // Calculate and set battle result
        //setBattleResult(userMovePower + (opponentMove ? opponentMove.power : 0));
    };


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
                <BattlePokeMoves pokemon={currOpponentPoke} onMoveSelected={handleOpponentMoveSelection} selectedMoves={randomOpponentMoves} isOpponent={true}/>
                
                {opponentSelectedMove && userSelectedMove && userTF && opponentTF && (
                    <BattleResults opponentSelectedMove={opponentSelectedMove} userSelectedMove={userSelectedMove} opponentTotalDamage= {calculateTotalPower(opponentSelectedMove.power, currOpponentPoke?.attack, currUserPoke?.defense, opponentTF)} userTotalDamage={calculateTotalPower(userSelectedMove.power, currUserPoke?.attack, currOpponentPoke?.defense, userTF)} />
                )}
                <BattlePokeMoves pokemon={currUserPoke} onMoveSelected={handleUserMoveSelection} selectedMoves={getRandomMoves(currUserPoke?.moves, 4)} isOpponent={false}/> 
            </div>
        )
    }


}

export default BattlePage;
