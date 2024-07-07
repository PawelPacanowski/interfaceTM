import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = "/php_api";

  constructor(private http: HttpClient) {}

  register(user: { username: string; password: string, dc_server_id: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register.php`, user);
  }

  login(user: { username: string; password: string, dc_server_id: string  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login.php`, user);
  }

  getProfile(user: { username: string; dc_server_id: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/getProfile.php`, user);
  }

  test(): Observable<any> {
    return this.http.get(`${this.baseUrl}/test.php`);
  }

  unregister(user: { username: string; password: string, dc_server_id: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/unregister.php`, user);
  }
}
