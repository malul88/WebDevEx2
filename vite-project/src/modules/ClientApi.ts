class ApiClient {
    baseURL: string = 'https://pokeapi.co/api/v2/';

    constructor(baseURL: string = 'https://pokeapi.co/api/v2/') {
      this.baseURL = baseURL;
    }
  
    async getPokemonById(id: number = 3) {
      try {
        const response = await fetch(`${this.baseURL}/ability/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    async get3RandomPokemon() {
        // Get 3 random pokemon from the API using random ids
        const randomIds = Array.from({length: 3}, () => Math.floor(Math.random() * 898));
        const pokemonData = await Promise.all(randomIds.map(id => this.getPokemonById(id)));
        return pokemonData;
    }
  }
  
  export default ApiClient;