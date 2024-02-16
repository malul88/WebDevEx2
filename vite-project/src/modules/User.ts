import ApiClient from './ClientApi';
import Pokemon from './Pokemon'; 

class User {
    wins: number;
    losses: number;
    pokemons: Pokemon[] = [];
    constructor(wins: number, losses: number, pokemons: Pokemon[] = []) {
        this.wins = wins;
        this.losses = losses;
        if (pokemons.length === 0) {
            ApiClient.getInstance().get3RandomPokemon().then(pokemons => {
                this.pokemons = pokemons.map(pokemon => new Pokemon(pokemon.name, pokemon.id, pokemon.stats.hp, pokemon.stats.attack, pokemon.stats.defense, pokemon.stats.speed, pokemon.types[0].type.name, pokemon.height, pokemon.weight, pokemon.sprites.front_default, 0, 0));
            });
        }
        else {
            this.pokemons = pokemons;
        }
            
    }
    //singleton pattern
    static instance: User;
    static getInstance() {
        if (!User.instance) {
            User.instance = User.loadUserData() || new User(0, 0, []);
        }
        return User.instance;
    }


    // Method for saving the user's data to local storage
    saveUserData() {
        const pokemons_json = this.pokemons.map(pokemon => pokemon.toJson());
        const userData = {
            wins: this.wins,
            losses: this.losses,
            pokemons: pokemons_json
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    static loadUserData() {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const parsedData = JSON.parse(userData);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const pokemons = parsedData.pokemons.map((pokemon: any) => Pokemon.fromJson(pokemon));
            return new User(parsedData.wins, parsedData.losses, pokemons);
        }
        return null;
    }
}

export default User; 