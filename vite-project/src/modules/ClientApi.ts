class ApiClient {
    baseURL: string = 'https://pokeapi.co/api/v2/';


    constructor(baseURL: string = 'https://pokeapi.co/api/v2/') {
      this.baseURL = baseURL;
    }
    // singleton pattern
    static instance: ApiClient;
    static getInstance() {
      if (!ApiClient.instance) {
        ApiClient.instance = new ApiClient();
      }
      return ApiClient.instance;
    }
  
    async getPokemonById(id: number = 3) {
      // add this header to request the data in json format 'Access-Control-Allow-Origin: *'
      const headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');


      try {
        const response = await fetch(`${this.baseURL}pokemon/${id}`, {
          method: 'GET',
          headers: headers,
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("-----------------data-----------------");
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error fetching pokemon data')
        console.error(error);
        return null;
      }
    }

    async get3RandomPokemon() {
        // Get 3 random pokemon from the API using random ids
        const randomIds = Array.from({length: 3}, () => Math.floor(Math.random() * 386));
        const pokemonData = await Promise.all(randomIds.map(id => this.getPokemonById(id)));
        return pokemonData;
    }
  }
  
  export default ApiClient;