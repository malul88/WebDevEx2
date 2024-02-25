import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BattleOverview } from "../BattleOverview/BattleOverview";
import BattlePokeMoves from "../BattlePokeMoves/BattlePokeMoves";
import UserContext from "../../modules/UserDataContext";
import Pokemon from "../../modules/Pokemon";
import ApiClient from "../../modules/ClientApi";
import { Move } from "../../modules/Pokemon";
import { BattleResults } from "../BattleResults/BattleResults";
import { FinalResult } from "../FinalResult/FinalResult";


const BattlePage: React.FC = () => {
    const [stage, setStage] = useState<number>(1);
    const { user } = useContext(UserContext);
    const [battlePlayed, setBattlePlayed] = useState<number>(0);
    const [battleWon, setBattleWon] = useState<number>(0);
    const [userPokemons, setUserPokemons] = useState<Pokemon[] | null>(null);
    const [userSelectedPokes, setUserSelectedPokes] = useState<Pokemon[]>([]);
    const [opponentSelectedPokes, setOpponentSelectedPokes] = useState<Pokemon[]>([]);
    const [currUserPoke, setCurrUserPoke] = useState<Pokemon | null>(null);
    const [currOpponentPoke, setCurrOpponentPoke] = useState<Pokemon | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [userTF, setUserTF] = useState<number | null>(1);
    const [opponentTF, setOpponentTF] = useState<number | null>(1);
    const [opponentPokemons] = useState<Pokemon[] | null>(Pokemon.loadPokemons("opponentPokemons"));
    const [userSelectedMove, setUserSelectedMove] = useState<Move | null>(null);
    const [opponentSelectedMove, setOpponentSelectedMove] = useState<Move | null>(null);
    const [randomOpponentMoves, setRandomOpponentMoves] = useState<Move[]>([]);
    const [randomUserMoves, setRandomUserMoves] = useState<Move[]>([]);
    const [isWinner, setIsWinner] = useState<boolean>(false);

    const navigate = useNavigate();

    /**
     * Gets a random selection of moves from the given moves array.
     * @param moves - The moves array.
     * @param count - The number of moves to select.
     * @returns The randomly selected moves.
     */
    const getRandomMoves = (moves: Move[] | undefined, count: number): Move[] => {
        // Shuffle moves array and select the first 4 moves
        if (!moves) {
            return [];
        }
        const shuffledMoves = moves.sort(() => Math.random() - 0.5);
        return shuffledMoves.slice(0, count);
    };

    const calculateTotalPower = (power: number, attack: number | undefined, oppDefense: number | undefined, tf: number): number => {
        // according to the formula: (power + attack) * tf - oppDefense
        if (attack === undefined || oppDefense === undefined)
            return 0;
        return (power + attack) * tf - oppDefense;
    };

    
    const updateMovesPower = async (moves: Move[], pokemon: Pokemon) => {
        // A function to update moves power asynchronously
        return await Promise.all(moves.map(async (move: Move) => {
        if (move.power < 0) {
            const movePower = await ApiClient.getInstance().getMovePower(move);
            const power = movePower ? movePower : 0;
            pokemon?.updateMovePower(move.name, power);
            return { ...move, power: power};
        }
        return move;
        }));
    };

    const handlePokemonClick = async (pokemon: Pokemon) => {
        /* 
        Select user and opponent pokemon
        Calculate type effectiveness
        Randomly select moves for the user and the opponent
        */
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
            setRandomOpponentMoves(await updateMovesPower(getRandomMoves(opponentPoke.moves, 4), opponentPoke));
            setRandomUserMoves(await updateMovesPower(getRandomMoves(pokemon.moves, 4), pokemon));
            console.log(`opponent after power: ${opponentPoke.moves}`);
        }
        else {
            console.log('opponent pokemons not loaded');
            throw new Error('opponent pokemons not loaded');
        }
        setStage(2);
    }

    useEffect(() => {
        // Load user pokemons
        if (user) {
            setUserPokemons(user.pokemons);
            setIsLoaded(true);
        }
    }, [user]);

    /**
     * Handles the user move selection.
     * @param move - The selected move.
     */
    const handleUserMoveSelection = (move: Move) => {
        setUserSelectedMove(move);

        // Randomly select opponent's move
        const opponentMove = getRandomMoves(randomOpponentMoves, 1)[0];
        handleOpponentMoveSelection(opponentMove);
        // sleep 6 seconds
        setTimeout(() => {
            if (userTF === null || opponentTF === null || currUserPoke === null || currOpponentPoke === null) {
                console.log('userTF or opponentTF or currUserPoke or currOpponentPoke is null');
                throw new Error('userTF or opponentTF or currUserPoke or currOpponentPoke is null');
            }
            const oppTotoalDamage = calculateTotalPower(opponentMove.power, currOpponentPoke?.attack, currUserPoke?.defense, opponentTF);
            const userTotalDamage = calculateTotalPower(move.power, currUserPoke?.attack, currOpponentPoke?.defense, userTF);
            const won = userTotalDamage > oppTotoalDamage;
            if (won) {
                setBattlePlayed(battlePlayed + 1);
                setBattleWon(battleWon + 1);
                user?.addPokeemonWin(currUserPoke?.name);
            } else {
                setBattlePlayed(battlePlayed + 1);
                user?.addPokeemonLoss(currUserPoke?.name);
            }
        }, 7000);
    }

    useEffect(() => {
        /* 
        Check if the battle is over
        Update user data and pokemon data
        if the battle is over, display the final result and navigate to home page
        */
        console.log(`battleWon: ${battleWon}`);
        console.log(`battlePlayed: ${battlePlayed}`);
        if (battlePlayed === 3) {
            if (battleWon > 1) {
                user?.addWin();
                user?.saveUserData();
                setIsWinner(true);
            } else {
                user?.addLoss();
                user?.saveUserData();
                setIsWinner(false);
            }
            setStage(3);
            //sleep 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);

        } else if (battlePlayed === 2 && battleWon === 2) {
            user?.addWin();
            user?.saveUserData();
            setIsWinner(true);
            setStage(3);
            //sleep 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } else if (battlePlayed === 2 && battleWon === 0) {
            user?.addLoss();
            user?.saveUserData();
            setIsWinner(false);
            setStage(3);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } else {
            setStage(1);
            setCurrOpponentPoke(null);
            setCurrUserPoke(null);
            setUserSelectedMove(null);
            setOpponentSelectedMove(null);
        }

    }, [battlePlayed]);

    /**
     * Handles the opponent move selection.
     * @param move - The selected move.
     */
    const handleOpponentMoveSelection = (move: Move) => {
        setOpponentSelectedMove(move);

        // Calculate and set battle result
        //setBattleResult(userMovePower + (opponentMove ? opponentMove.power : 0));
    };

    if (stage === 1 && isLoaded && userPokemons && opponentPokemons) {
        // display pokemon selection
        return (
            <div>
                <h2>Choose your Pokemon</h2>
                <BattleOverview userPokes={userPokemons} opponentPokes={opponentPokemons} alredySelectedOpponentPokes={opponentSelectedPokes} alredySelectedUserPokes={userSelectedPokes} handlePokemonClick={handlePokemonClick} />
            </div>
        )
    } else if (stage === 2 && isLoaded) {
        // display Selected pokemon and moves
        return (
            <div>
                <h2>Battle</h2>
                <BattlePokeMoves
                    pokemon={currOpponentPoke}
                    onMoveSelected={handleOpponentMoveSelection}
                    selectedMoves={randomOpponentMoves}
                    isOpponent={true}
                />

                {opponentSelectedMove && userSelectedMove && userTF && opponentTF ? (
                    <BattleResults
                        opponentSelectedMove={opponentSelectedMove}
                        userSelectedMove={userSelectedMove}
                        opponentTotalDamage={calculateTotalPower(
                            opponentSelectedMove.power,
                            currOpponentPoke?.attack,
                            currUserPoke?.defense,
                            opponentTF
                        )}
                        userTotalDamage={calculateTotalPower(
                            userSelectedMove.power,
                            currUserPoke?.attack,
                            currOpponentPoke?.defense,
                            userTF
                        )}
                    />
                ) : (
                    <div style={{ backgroundColor: 'transparent', width: '100%', height: '250px' }}></div>
                )}

                <BattlePokeMoves
                    pokemon={currUserPoke}
                    onMoveSelected={handleUserMoveSelection}
                    selectedMoves={randomUserMoves}
                    isOpponent={false}
                />
            </div>
        );
    } else if (stage === 3) {
        // dispaly final results results
        return (
            <FinalResult isWinner={isWinner} />
        )
    }
}

export default BattlePage;