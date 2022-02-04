import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: User = <User>{};

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    sessionStorage.setItem('trainer-session', JSON.stringify(user));
    this._user = user;
  }

  constructor(private readonly http: HttpClient, private router: Router,) {
    this._user = JSON.parse(sessionStorage.getItem('trainer-session') || '{}');
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': 'PHTR7fTglU6Hdl6/geiBaQ==',
    });
  }

  public loginOrRegisterUser(username: string): void {
    const headers = this.createHeaders();
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
                headers,
              }
            )
            .subscribe((response: any) => {
              this.user = response;
              this.router.navigateByUrl('/catalogue');
            });
        } else {
          this.user = users[0];
          this.router.navigateByUrl('/catalogue');
        }
      });
  }

  public logout(): void {
    sessionStorage.removeItem('trainer-session');
    this.router.navigateByUrl('/login');
  }

  public userIsLoggedIn(): boolean {
    if (Object.keys(this._user).length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  public addPokemonToUser(name: string): void {
    const newPokemon = this.user.pokemon.concat(name);
    const data = {
      ...this.user,
      pokemon: newPokemon,
    };
    const headers = this.createHeaders();
    this.http
      .patch<User>(
        `https://at-assignment-api.herokuapp.com/trainers/${this.user.id}`,
        data,
        { headers }
      )
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  public removePokemonFromUser(nameToRemove: string): void {
    const newPokemon = this.user.pokemon.filter(name => name !== nameToRemove);
    const data = {
      ...this.user,
      pokemon: newPokemon,
    };
    const headers = this.createHeaders();
    this.http
      .patch<User>(
        `https://at-assignment-api.herokuapp.com/trainers/${this.user.id}`,
        data,
        { headers }
      )
      .subscribe((user: User) => {
        this.user = user;
      });
  }
}
