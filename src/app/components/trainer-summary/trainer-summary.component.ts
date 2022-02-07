import { Component } from "@angular/core";
import { UserService } from 'src/app/services/user.service';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
    selector: 'app-trainer-summary',
    templateUrl: './trainer-summary.component.html'
})

export class TrainerSummaryComponent {

    constructor(private userService: UserService) {}

    // a getter function for the template
    // returns an array of the user's Pokemon
    get userPokemon(): Pokemon[] {
        return this.userService.user.pokemon;
    }

    // a getter function for the template
    // returns the users's username
    get username(): string {
        return this.userService.user.username;
    }

    // an event handler for the 'remove Pokemon' button
    onPokemonRemove(name: string): void {
        this.userService.removePokemonFromUser(name);
      }
    

}