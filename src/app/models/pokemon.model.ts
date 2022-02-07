// a model for an individual Pokemon object
export interface Pokemon {
    name: string;
    url: string;
    id: string;
}

// a model for the Pokemon API response object
export interface PokemonResults {
    results: Pokemon[];
}