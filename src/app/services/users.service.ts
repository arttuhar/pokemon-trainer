import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User, UsersResponse } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    private users: User[] = [];

    constructor(private readonly http: HttpClient) {

    }

    public fetchUsers(): void {
        this.http.get<User[]>('https://at-assignment-api.herokuapp.com/trainers')
            .subscribe((users: User[]) => {
                this.users = users;
                console.log(users);
            });
    }
}