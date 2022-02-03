import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _user: User = <User>{};

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    sessionStorage.setItem('trainer-session', JSON.stringify(user));
    this._user = user;
  }

  constructor(private readonly http: HttpClient) {
    this._user = JSON.parse(sessionStorage.getItem('trainer-session') || '{}');
  }

  public loginOrRegisterUser(username: string): void {
    this.http
      .get<User[]>(
        `https://at-assignment-api.herokuapp.com/trainers?username=${username}`
      )
      .subscribe((users: User[]) => {
        if (!Object.keys(users).length) {
          this.http
            .post(
              'https://at-assignment-api.herokuapp.com/trainers',
              JSON.stringify({
                username: username,
                pokemon: [],
              }),
              {
                headers: {
                  'X-API-Key': 'PHTR7fTglU6Hdl6/geiBaQ==',
                  'Content-Type': 'application/json',
                },
              }
            )
            .subscribe((response: any) => {
              this.user = response;
            });
        } else {
          this.user = users[0];
        }
      });
  }
}
