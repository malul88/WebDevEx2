import ApiClient from "./ClientApi";
import Pokemon from "./Pokemon";

type UserInterface = {
    wins: number;
    losses: number;
    pokemons: Pokemon[];
    opponentPokemons: Pokemon[];
    };

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
    const pokemons = await ApiClient.getInstance().get3RandomPokemon().then((pokemons) => {
        return pokemons.map(
            (pokemon) =>
            new Pokemon(
                pokemon.name,
                pokemon.id,
                pokemon.stats.hp,
                pokemon.stats.attack,
                pokemon.stats.defense,
                pokemon.stats.speed,
                pokemon.types[0].type.name,
                pokemon.height,
                pokemon.weight,
                pokemon.sprites.front_default,
                0,
                0
            )
        );
        });
    return pokemons;
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
}

export default User;
