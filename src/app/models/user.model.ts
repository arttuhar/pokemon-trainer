export interface User {
    id: number;
    username: string;
    pokemon: string[];
}

export interface UsersResponse {
    success: boolean;
    data: User[];
}
