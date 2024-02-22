import Pokemon from "./Pokemon";

class ApiClient {
    baseURL: string = 'https://pokeapi.co/api/v2/';
    static damageRelations: string[] = [ "double_damage_to", "half_damage_to",  "no_damage_to"];


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

    async getTF(userType: string, opponentType: string) {
      try{
        const response = await fetch(`${this.baseURL}type/${userType}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        ApiClient.damageRelations.forEach((relation) => {
          if(data.damage_relations[relation].map((type: any) => type.name).includes(opponentType)){
            if (relation === "double_damage_to"){
              return 2;
            }
            else if (relation === "half_damage_to"){
              return 0.5;
            }
            else if (relation === "no_damage_to"){
              return 1;
            }
            
          }
        });
        return 1;

      }
      catch(error){
        console.error('Error fetching TF data')
        console.error(error);
        return null;
      }
    }
  }
  
  export default ApiClient;