import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})

// A service for all user related API interactions
export class UserService {
  // init an empty user object
  private _user: User = <User>{};

  // a getter function for user
  get user(): User {
    return this._user;
  }

  // a setter function for the user
  set user(user: User) {
    // stringify the new user object and store it in session storage
    sessionStorage.setItem('trainer-session', JSON.stringify(user));
    // replace the private user variable with the new object
    this._user = user;
  }

  constructor(private readonly http: HttpClient, private router: Router) {
    // check session storage for an existing user when calling this service for the first time
    this._user = JSON.parse(sessionStorage.getItem('trainer-session') || '{}');
  }

  // a helper function for creating http headers for POST and PATCH requests
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': 'PHTR7fTglU6Hdl6/geiBaQ==',
    });
  }

  // a function that either logs in the user if the username exists in the API
  // OR
  // creates a new user with no Pokemon if the username is not in the API
  public loginOrRegisterUser(username: string): void {
    const headers = this.createHeaders();
    this.http
      .get<User[]>(
        `https://at-assignment-api.herokuapp.com/trainers?username=${username}`
      )
      .subscribe((users: User[]) => {
        // if API response is [] i.e. user doesn't exist
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
              // use the setter to update session storage and state
              this.user = response;
              // redirect to the main page
              this.router.navigateByUrl('/catalogue');
            });
        }
        // the API response wasn't empty i.e. the username already exists
        else {
          // use the setter to update session storage and state
          // GET returns an array from the API, hence the [0]
          this.user = users[0];
          // redirect to the main page
          this.router.navigateByUrl('/catalogue');
        }
      });
  }

  // a function that clears the user from the service state and session storage
  public logout(): void {
    // clear the user from session storage
    sessionStorage.removeItem('trainer-session');
    // set an empty user object as the new user state
    this._user = <User>{};
    // redirect to the login page
    this.router.navigateByUrl('/login');
  }

  // a public function used to check if a user is currently logged in
  // mainly intended for conditional rendering in templates
  public userIsLoggedIn(): boolean {
    // if the user object is not empty
    if (Object.keys(this._user).length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  // a function that adds a Pokemon object to the user's Pokemon array and updates the API
  public addPokemonToUser(pokemon: Pokemon): void {
    // create a new array with the added Pokemon
    const newPokemon = this.user.pokemon.concat(pokemon);
    const sortedNewPokemon = newPokemon.sort((p1, p2) => Number(p1.id) - Number(p2.id));
    // create a payload where the old Pokemon array is replaced with the new one
    const data = {
      ...this.user,
      pokemon: sortedNewPokemon,
    };
    const headers = this.createHeaders();
    // PATCH request to update the API
    this.http
      .patch<User>(
        `https://at-assignment-api.herokuapp.com/trainers/${this.user.id}`,
        data,
        { headers }
      )
      .subscribe((user: User) => {
        // use the setter to update session storage and state
        this.user = user;
      });
  }

  // a function that removes a Pokemon object from the user's Pokemon array and updates the API
  public removePokemonFromUser(nameToRemove: string): void {
    // using the Pokemon name, return a new filtered array where the Pokemon has been removed
    const newPokemon = this.user.pokemon.filter(
      (pokemon) => pokemon.name !== nameToRemove
    );
    // create a payload where the old Pokemon array is replaced with the new one
    const data = {
      ...this.user,
      pokemon: newPokemon,
    };
    const headers = this.createHeaders();
    // PATCH request to update the API
    this.http
      .patch<User>(
        `https://at-assignment-api.herokuapp.com/trainers/${this.user.id}`,
        data,
        { headers }
      )
      .subscribe((user: User) => {
        // use the setter to update session storage and state
        this.user = user;
      });
  }
}
