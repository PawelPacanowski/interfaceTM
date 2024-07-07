import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {BotApiService} from "../bot-api.service";
import {SessionService} from "../session.service";
import {AuthService} from "../auth.service";
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  registerPending: boolean = false;
  errorInputDCID: boolean = false;
  errorInputUsername: boolean = false;
  errorPassword: boolean = false;
  errorRegister: boolean = false;
  loadingAnim: boolean = false;
  registerSuccess: boolean = false;

  public dcServerID: string = '';
  public username: string = '';
  public password1: string = '';
  public password2: string = '';

  constructor(private router: Router, private api: BotApiService, private sessionService: SessionService, private auth: AuthService) {

  }

  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  registerButton() {
    if (this.registerPending || this.errorPassword || this.errorInputDCID || this.errorInputUsername || this.dcServerID == "" || this.username == "" || this.password1 == "" || this.password2 == "")
      return;

    this.registerSuccess = false;
    this.registerPending = true;
    let hashedPassword = this.hashPassword(this.password1);
    this.auth.register({username: this.username, password: hashedPassword, dc_server_id: this.dcServerID}).subscribe(
      result => {
        console.log(true, result);
        this.registerSuccess = true;
        this.registerPending = false;
      },

      error => {
        console.log(false, error);
        this.errorRegister = true;
        this.registerPending = false;
      }
    )
  }

  handleInputDCID() {
    if (this.registerPending) return;

    if (!this.containsOnlyNumbers(this.dcServerID)) {
      this.errorInputDCID = true;
    }
    else {
      this.errorInputDCID = false;
    }

    if (this.dcServerID == "") this.errorInputDCID = false;
    this.errorRegister = false;
  }

  containsOnlyNumbers(str: string): boolean {
    return /^\d+$/.test(str);
  }

  handleInputUsername() {
    if (this.username.length > 50) this.errorInputUsername = true;
    else this.errorInputUsername = false;
  }

  handlePasswordInput() {
    if (this.password1.length > 255 || this.password2.length > 255 || this.password1 != this.password2 || this.password1.length < 8 || this.password2.length < 8) this.errorPassword = true;
    else this.errorPassword = false;
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
