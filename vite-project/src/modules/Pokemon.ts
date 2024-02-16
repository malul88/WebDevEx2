
class Pokemon {
    name: string;
    id: number;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    type: string;
    height: number;
    weight: number;
    imageUrl: string;
    wins: number;
    losses: number;
    
    constructor(name: string, id: number, hp: number, attack: number, defense: number, speed: number, type: string, height: number, weight: number, imageUrl: string, wins: number, losses: number) {
        this.name = name;
        this.id = id;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.type = type;
        this.height = height;
        this.weight = weight;
        this.imageUrl = imageUrl;
        this.wins = wins;
        this.losses = losses;
    }
    // Add a method to get the win/loss ratio
    getWinLossRatio() {
        return this.wins / this.losses;
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
        return new Pokemon(json.name, json.id, json.hp, json.attack, json.defense, json.speed, json.type, json.height, json.weight, json.imageUrl, json.wins, json.losses);
    }


}

export default Pokemon;








































