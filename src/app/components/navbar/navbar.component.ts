import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

    constructor(private userService: UserService, private router: Router) {}

    onLogout(): void {
        this.userService.logout();
    }

    onTrainerClick(): void {
        this.router.navigateByUrl('/trainer');
    }

    onHomeClick(): void {
        this.router.navigateByUrl('/catalogue');
    }

    get userIsLoggedIn(): boolean {
        return this.userService.userIsLoggedIn();
    }

}