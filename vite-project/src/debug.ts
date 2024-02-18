import ClientAPI from './modules/ClientApi' 

const api = new ClientAPI()
const res = api.getPokemonById(1)
console.log(res)