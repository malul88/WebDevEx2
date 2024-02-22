import ApiClient from "./ClientApi";
import Pokemon from "./Pokemon";
import { Move } from "./Pokemon";

type UserInterface = {
    wins: number;
    losses: number;
    pokemons: Pokemon[];
    opponentPokemons: Pokemon[];
    };

//the power of a move is not stored in the pokemon object, but in the move object
//so we need diffrent API calls to get the power of a move
async function getPowerForMove(moveName: string): Promise<number> {
  const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
  const moveData = await response.json();
  if (moveData.power === null) {
    return 0;
  }
  return moveData.power;
}

async function createMovesArray(movesNames: string[]): Promise<Move[]> {
  const movesPromises = movesNames.map(async name => {
    const power = await getPowerForMove(name);
    return { name, power };
  });

  return Promise.all(movesPromises);
}

function getRandomMoves(moves: any[], count: number = 4): string[] {
  // If there are less than 4 moves, return them all
  if (moves.length <= count) {
    return moves.map(move => move.move.name);
  }

  // Shuffle the array
  const shuffled = moves.sort(() => 0.5 - Math.random());

  // Get the first 4 elements
  return shuffled.slice(0, count).map(move => move.move.name);;
  
}

// User class that implements the UserInterface
class User implements UserInterface{
  wins: number = 0;
  losses: number = 0;
  pokemons: Pokemon[] = [];
  opponentPokemons: Pokemon[] = [];

  constructor(wins: number, losses: number, pokemons: Pokemon[]) {
    this.wins = wins;
    this.losses = losses;
    this.pokemons = pokemons;
    this.saveUserData();
  }
  
  static async constructNewUser() {
    const pokemons = await User.get3RandomPokemon()
    return new User(0, 0, pokemons);

  }

  static async get3RandomPokemon() {
    console.log("getting 3 random pokemon ");
    // called by 
    const pokemons = await ApiClient.getInstance().get3RandomPokemon();
    const newPokemons = await Promise.all(pokemons.map(async (pokemon) => {

      // Extract base stats
      let hp: number = 0 ,attack: number = 0, defense: number = 0, speed: number = 0, specialAttack: number = 0, specialDefense: number = 0;
      for (let i = 0; i < pokemon.stats.length; i++) {
          if (pokemon.stats[i].stat.name === "hp") {
              hp = pokemon.stats[i].base_stat;
          }else if (pokemon.stats[i].stat.name === "attack") {
              attack = pokemon.stats[i].base_stat;
          }else if (pokemon.stats[i].stat.name === "defense") {
              defense = pokemon.stats[i].base_stat;
          }else if (pokemon.stats[i].stat.name === "speed") {
              speed = pokemon.stats[i].base_stat;
          }else if (pokemon.stats[i].stat.name === "special-attack") {
              specialAttack = pokemon.stats[i].base_stat;
          }else if (pokemon.stats[i].stat.name === "special-defense") {    
              specialDefense = pokemon.stats[i].base_stat;
          }
        }

      //const randomMoves = getRandomMoves(pokemon.moves);
      //console.log("random moves: ", randomMoves);
      //const movesArray = await createMovesArray(randomMoves);
      console.log("movesArray: ", pokemon.moves); 
      const movesNames: Move[] = pokemon.moves.map((move: any) => ({name: move.move.name,
                                                                   power: 0})); 
      return new Pokemon(
          pokemon.name,
          pokemon.id,
          hp,
          attack,
          defense,
          speed,
          specialAttack,
          specialDefense,
          pokemon.types[0].type.name,
          pokemon.height,
          pokemon.weight,
          pokemon.sprites.front_default,
          movesNames,
          0,
          0
        );
    })); 
    return newPokemons;
  }

  //singleton pattern
  static instance: User;
  static async getInstance() {
    if (!User.instance) {
      User.instance = User.loadUserData() || await this.constructNewUser();
    }
    return User.instance;
  }

  // Method for saving the user's data to local storage
  saveUserData() {
    const pokemons_json = this.pokemons.map((pokemon) => pokemon.toJson());
    const userData = {
      wins: this.wins,
      losses: this.losses,
      pokemons: pokemons_json,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  static loadUserData() {
    console.log("loading user data");
    const userData = localStorage.getItem("userData");
    if (userData) {
        console.log("user data found");
      const parsedData = JSON.parse(userData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pokemons = parsedData.pokemons.map((pokemon: any) =>
        Pokemon.fromJson(pokemon)
      );
      return new User(parsedData.wins, parsedData.losses, pokemons);
    }
    return null;
  }

  async resetUserData() {
    localStorage.removeItem("userData");
    User.instance.losses = 0;
    User.instance.wins = 0;
    try {

    const fetchedPokes = await User.get3RandomPokemon();
    User.instance.pokemons = fetchedPokes;
    User.instance.saveUserData();
    } catch (error) {
        console.error(error);
        }
    return User.instance;
  }

  addWin(pokemonName: string) {
    this.wins++;
    const pokemon = this.pokemons.find(poke => poke.name === pokemonName);
    if (pokemon) {
      pokemon.addWin();
    }
    this.saveUserData();

  }
}

export default User;
