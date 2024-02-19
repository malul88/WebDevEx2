
class Pokemon {
    name: string;
    id: number;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
    type: string;
    height: number;
    weight: number;
    imageUrl: string;
    wins: number;
    losses: number;
    
    constructor(name: string, id: number, hp: number, attack: number, defense: number, speed: number, specialAttack: number, specialDefense: number, type: string, height: number, weight: number, imageUrl: string, wins: number, losses: number) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.height = height;
        this.weight = weight;
        this.imageUrl = imageUrl;
        this.wins = wins;
        this.losses = losses;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.specialAttack = specialAttack;
        this.specialDefense = specialDefense;
        }

    // Add a method to get the win/loss ratio
    getWinLossRatio() {
        if (this.losses === 0 && this.wins === 0) return 0;
        return (this.wins / (this.wins + this.losses)) * 100;
    }

    // Add a method to convert pokemon to json
    toJson() {
        return {
            name: this.name,
            id: this.id,
            hp: this.hp,
            attack: this.attack,
            defense: this.defense,
            speed: this.speed,
            specialAttack: this.specialAttack,
            specialDefense: this.specialDefense,
            type: this.type,
            height: this.height,
            weight: this.weight,
            imageUrl: this.imageUrl,
            wins: this.wins,
            losses: this.losses
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromJson(json: any) {
        return new Pokemon(json.name, json.id, json.hp, json.attack, json.defense, json.speed,json.specialAttack, json.specialDefense, json.type, json.height, json.weight, json.imageUrl, json.wins, json.losses);
    }

    addWin() {
        this.wins++;
    }

    addLoss() {
        this.losses++;
    }

    static savePokemons(name :string, pokemons: Pokemon[]) {
        const pokemons_json = pokemons.map((pokemon) => pokemon.toJson());
        localStorage.setItem(name, JSON.stringify(pokemons_json));
    }

    static loadPokemons(name: string) {
        const pokemons_json = localStorage.getItem(name);
        if (pokemons_json) {
            const parsedData = JSON.parse(pokemons_json);
            return parsedData.map((pokemon: any) => Pokemon.fromJson(pokemon));
        }
        return null;
    }



}

export default Pokemon;








































