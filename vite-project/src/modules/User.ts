import Pokemon from './Pokemon'; 

class User {
    wins: number;
    losses: number;
    pokemons: Pokemon[];
    constructor(wins: number, losses: number, pokemons: Pokemon[]) {
        this.wins = wins;
        this.losses = losses;
        this.pokemons = pokemons;
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