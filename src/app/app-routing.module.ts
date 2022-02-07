import { NgModule } from "@angular/core";
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RouterModule, Routes } from "@angular/router";
import { CataloguePage } from "./pages/catalogue/catalogue.page";
import { LoginPage } from "./pages/login/login.page";
import { TrainerPage } from "./pages/trainer/trainer.page";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginPage,
        canActivate: [ LoginGuard ]
    },
    {
        path: 'catalogue',
        component: CataloguePage,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'trainer',
        component: TrainerPage,
        canActivate: [ AuthGuard ]
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {

}