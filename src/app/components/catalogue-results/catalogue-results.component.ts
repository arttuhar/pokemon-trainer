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
export class CatalogueResultsComponent implements OnInit {
  public _pokemon: PokemonResults = <PokemonResults>{};

  get pokemon(): PokemonResults {
    return this._pokemon;
  }

  set pokemon(pokemon: PokemonResults) {
    sessionStorage.setItem('pokemon-catalogue', JSON.stringify(pokemon));
    this._pokemon = pokemon;
  }

  constructor(private http: HttpClient, private userService: UserService) {
    this._pokemon = JSON.parse(sessionStorage.getItem('pokemon-catalogue') || '{}');
  }

  fetchPokemonData(): void {
    this.http
      .get<PokemonResults>('https://pokeapi.co/api/v2/pokemon')
      .pipe(
        map((response: PokemonResults) => {
          const transformedResults = response.results.map(
            (pokemon: Pokemon) => {
              return { ...pokemon,
                name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1).toLowerCase(),
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
          this.pokemon = response;
        },
        error: (error) => {
          console.error(error.message);
        },
      });
  }

  ngOnInit() {
    if (Object.keys(this._pokemon).length === 0) {
      this.fetchPokemonData();
    }
  }

  onPokemonSubmit(pokemon: Pokemon): void {
    this.userService.addPokemonToUser(pokemon);
  }

  trainerHasPokemon(id: string): boolean {
    const trainerPokemonIds = this.userService.user.pokemon.map(pokemon => pokemon.id);
    if (trainerPokemonIds.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
