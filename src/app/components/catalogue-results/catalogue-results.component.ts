import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonResults } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-catalogue-results',
  templateUrl: './catalogue-results.component.html',
})
export class CatalogueResultsComponent implements OnInit {
  public pokemon: PokemonResults | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<PokemonResults>('https://pokeapi.co/api/v2/pokemon')
      .pipe(
        map((response: PokemonResults) => {
          const transformedResults = response.results.map(
            (pokemon: Pokemon) => {
              return { ...pokemon, id: pokemon.url.split('/')[6] || '' };
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
}
