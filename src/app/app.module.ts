import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {BotApiService} from "./bot-api.service";
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { WordListElementComponent } from './word-list-element/word-list-element.component';
import { UserListElementComponent } from './user-list-element/user-list-element.component';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    WordListElementComponent,
    UserListElementComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BotApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
