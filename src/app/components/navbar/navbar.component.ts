import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
// A navbar component used for navigating between certain routes
export class NavbarComponent {

    constructor(private userService: UserService, private router: Router) {}

    // clears the user from state and session storage and redirects to the login page
    onLogout(): void {
        this.userService.logout();
    }

    // navigate to the trainer view
    onTrainerClick(): void {
        this.router.navigateByUrl('/trainer');
    }

    // navigate to the catalogue view
    onHomeClick(): void {
        this.router.navigateByUrl('/catalogue');
    }

    // a getter for the template
    // used for conditional rendering
    get userIsLoggedIn(): boolean {
        return this.userService.userIsLoggedIn();
    }

}