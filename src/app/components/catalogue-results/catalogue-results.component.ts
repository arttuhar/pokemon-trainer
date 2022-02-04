import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pokemon, PokemonResults } from "src/app/models/pokemon.model";

@Component({
    selector: 'app-catalogue-results',
    templateUrl: './catalogue-results.component.html',
    styleUrls: ['./catalogue-results.component.css']
})

export class CatalogueResultsComponent implements OnInit {

    public pokemon: PokemonResults | null = null;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.http.get<PokemonResults>('https://pokeapi.co/api/v2/pokemon')
            .subscribe({
                next: (response) => {
                    //console.log(response);
                    this.pokemon = response;
                    //console.log(this.pokemon.results[0])
                },
                error: (error) => {
                    console.error(error.message);
                }
        })
    }
}