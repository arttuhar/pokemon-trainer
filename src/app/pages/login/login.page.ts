import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from 'src/app/services/users.service';
import { User } from "../../models/user.model"

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html'
})

export class LoginPage implements OnInit {

    constructor(
        private router: Router,
        private usersService: UsersService) { }
    
      ngOnInit(): void {
          
      }
    

}