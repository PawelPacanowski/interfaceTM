import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Make this service globally available
})
export class SessionService {
  private sessionDCServerID: string = ""
  private established: boolean = false;

  establishSession(dcServerId: string) {
    if (dcServerId == "") return;
    this.sessionDCServerID = dcServerId;
    this.established = true;
  }

  resetSession() {
    this.sessionDCServerID = "";
    this.established = false;
  }

  getSessionServerID(): string {
    if (this.established)
      return this.sessionDCServerID;

    else return "";
  }

  isEstablished(): boolean {
    return this.established;
  }
}
