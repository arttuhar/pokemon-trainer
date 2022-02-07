import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }
    
    ngOnInit(): void {
        
    }

    onSubmit(loginForm: NgForm): void {
        const { username } = loginForm.value;
        this.userService.loginOrRegisterUser(username);
      }
}