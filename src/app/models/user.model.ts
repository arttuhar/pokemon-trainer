import { Pokemon } from "./pokemon.model";

// a model for the User object
export interface User {
    id: number;
    username: string;
    pokemon: Pokemon[];
}
