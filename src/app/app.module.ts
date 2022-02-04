import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { AppRoutingModule } from './app-routing.module';
import { CatalogueResultsComponent } from './components/catalogue-results/catalogue-results.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TrainerSummaryComponent } from './components/trainer-summary/trainer-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    RegisterPage,
    TrainerPage,
    CataloguePage,
    NavbarComponent,
    CatalogueResultsComponent,
    TrainerSummaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
  
export class AppModule { }
