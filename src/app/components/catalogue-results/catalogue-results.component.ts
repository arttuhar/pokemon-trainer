import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Pokemon, PokemonResults } from 'src/app/models/pokemon.model';

@Component({
    selector: 'app-catalogue-results',
    templateUrl: './catalogue-results.component.html',
    styleUrls: ['./catalogue-results.component.css']
})
// a component that is responsible for fetching Pokemon data from the PokeAPI
export class CatalogueResultsComponent implements OnInit {
  // PokemonResults contains the whole API response
  public _pokemon: PokemonResults = <PokemonResults>{};

  // getter for the PokemonResults state which contains the whole API response
  get pokemon(): PokemonResults {
    return this._pokemon;
  }

  // setter for the PokemonResults state
  set pokemon(pokemon: PokemonResults) {
    // stringify the new object and update session storage with it
    sessionStorage.setItem('pokemon-catalogue', JSON.stringify(pokemon));
    // update the state to the new object
    this._pokemon = pokemon;
  }

  constructor(private http: HttpClient, private userService: UserService) {
    // check session storage for an existing list of Pokemon when calling this service for the first time
    this._pokemon = JSON.parse(sessionStorage.getItem('pokemon-catalogue') || '{}');
  }

  // a function that fetches Pokemon from the PokeAPI
  fetchPokemonData(): void {
    this.http
      .get<PokemonResults>('https://pokeapi.co/api/v2/pokemon?limit=151')
      .pipe(
        // transform the response data to contain custom values
        map((response: PokemonResults) => {
          const transformedResults = response.results.map(
            (pokemon: Pokemon) => {
              return { ...pokemon,
                // capitalize the first letter of a Pokemon's name
                name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1).toLowerCase(),
                // extract the id number of the pokemon from the url value
                id: pokemon.url.split('/')[6] || '' };
            }
          );
          const transformedResponse = {
            ...response,
            results: transformedResults,
          };
          return transformedResponse;
        })
      )
      .subscribe({
        next: (response) => {
          // use the setter to update session storage and state
          this.pokemon = response;
        },
        error: (error) => {
          console.error(error.message);
        },
      });
  }

  // run this block of code when initializing the component
  ngOnInit() {
    // if session storage doesn't contain the list of Pokemon
    if (Object.keys(this._pokemon).length === 0) {
      // execute the http request
      this.fetchPokemonData();
    }
  }

  // an event handler for the 'add pokemon' button
  onPokemonSubmit(pokemon: Pokemon): void {
    this.userService.addPokemonToUser(pokemon);
  }

  // a function that checks whether the Pokemon (id) is already in the user's Pokemon array
  // used for conditional rendering in the template
  trainerHasPokemon(id: string): boolean {
    const trainerPokemonIds = this.userService.user.pokemon.map(pokemon => pokemon.id);
    if (trainerPokemonIds.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
