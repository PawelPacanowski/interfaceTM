import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {BotApiService} from "../bot-api.service";
import {SessionService} from "../session.service";
import {AuthService} from "../auth.service";
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  errorInputDCID: boolean = false;
  errorInputUsername: boolean = false;
  errorPassword: boolean = false;
  errorLogin: boolean = false;
  errorBotInit: boolean = false;

  loadingAnim: boolean = false;
  loginPending: boolean = false;

  dcServerID: string = '';
  username: string = '';
  password: string = "";

  constructor(private router: Router, private api: BotApiService, private sessionService: SessionService, private auth: AuthService) {
  }

  containsOnlyNumbers(str: string): boolean {
    return /^\d+$/.test(str);
  }

  navigateToDashboard() {
    this.sessionService.establishSession(this.dcServerID)
    this.router.navigate(['dashboard']);
  }

  loginButton() {
    if (this.errorInputUsername || this.errorPassword || this.errorInputDCID || this.username == "" || this.password == "" || this.dcServerID == "") return;

    this.loadingAnim = true;
    this.loginPending = true;

    this.auth.getProfile({username: this.username, dc_server_id: this.dcServerID}).subscribe(
      result => {
        if (this.checkPassword(this.password, result.password)) {
          console.log("password correct");

          this.api.checkIfServerExists(this.dcServerID).subscribe(
            response => {
              if (response) {
                this.sessionService.establishSession(result.dc_server_id);
                this.navigateToDashboard();
                this.loadingAnim = false;
                this.errorLogin = false;
                this.loginPending = false;
                this.errorBotInit = false;
              }

              else {
                this.loadingAnim = false;
                this.loginPending = false;
                this.errorBotInit = true;
              }

            },
            error => {
              this.loadingAnim = false;
              this.loginPending = false;
              this.errorBotInit = false;
            }
          )
        }
        else {
          console.log("password incorrect");
        }
      },

      error => {
        console.log("error trying to log in");
        this.errorLogin = true;
        this.loadingAnim = false;
        this.loginPending = false;
        this.errorBotInit = false;
      }
    )
  }

  checkPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  handleInputDCID() {
    if (this.loginPending) return;

    if (!this.containsOnlyNumbers(this.dcServerID)) {
      this.errorInputDCID = true;
    }
    else {
      this.errorInputDCID = false;
    }

    this.errorLogin = false;
  }


  handleInputUsername() {
    if (this.username.length > 50) this.errorInputUsername = true;
    else this.errorInputUsername = false;

    this.errorLogin = false;
  }

  handlePasswordInput() {
    if (this.password.length > 255 || this.password.length < 8) this.errorPassword = true;
    else this.errorPassword = false;

    this.errorLogin = false;
  }

  navigateToRegistration() {
    this.router.navigate(['register']);
  }
}
