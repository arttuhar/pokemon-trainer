import { Component } from "@angular/core";
import { UserService } from 'src/app/services/user.service';
import { Pokemon, PokemonResults } from 'src/app/models/pokemon.model';

@Component({
    selector: 'app-trainer-summary',
    templateUrl: './trainer-summary.component.html'
})

export class TrainerSummaryComponent {

    constructor(private userService: UserService) {}

    get userPokemon(): string[] {
        return this.userService.user.pokemon;
    }

    onPokemonRemove(name: string): void {
        this.userService.removePokemonFromUser(name);
      }
    

}