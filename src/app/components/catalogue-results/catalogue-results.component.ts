import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pokemon } from "src/app/models/pokemon.model";

@Component({
    selector: 'app-catalogue-results',
    templateUrl: './catalogue-results.component.html'
})

export class CatalogueResultsComponent implements OnInit {

    public pokemon: Pokemon | null = null;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.http.get<Pokemon>('https://pokeapi.co/api/v2/pokemon')
            .subscribe({
                next: (response) => {
                    console.log(response);
                    this.pokemon = response;
                },
                error: (error) => {
                    console.error(error.message);
                }
        })
    }
}