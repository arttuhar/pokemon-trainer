import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CataloguePage } from "./pages/catalogue/catalogue.page";
import { LoginPage } from "./pages/login/login.page";
import { RegisterPage } from "./pages/register/register.page";
import { TrainerPage } from "./pages/trainer/trainer.page";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'register',
        component: RegisterPage
    },
    {
        path: 'catalogue',
        component: CataloguePage
    },
    {
        path: 'trainer',
        component: TrainerPage
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {

}