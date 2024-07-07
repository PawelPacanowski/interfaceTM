import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BotApiService {
  private api = '/bot_api';

  constructor(private http: HttpClient) {}

  checkIfServerExists(serverID: string): Observable<boolean> {
    let url: string = `${this.api}/servers/check_if_exists/${serverID}`;
    return this.http.get<boolean>(url);
  }

  getServerTotalWords(serverID: string): Observable<string> {
    let url: string = `${this.api}/servers/get_total_words/${serverID}`;
    return this.http.get(url, { responseType: 'text' });
  }

  getServerTotalFlaggedWords(serverID: string): Observable<string> {
    let url: string = `${this.api}/servers/get_total_flagged_words/${serverID}`;
    return this.http.get(url, { responseType: 'text' });
  }

  getServerWords(serverID: string): Observable<any> {
    let url: string = `${this.api}/servers/get_flagged_words_count/${serverID}`;
    return this.http.get(url);
  }

  deleteWord(serverID: string, word: string) {
    let url: string = `${this.api}/servers/remove_flagged_words/${serverID}`;
    let data = [word];
    return this.http.delete(url, {body: data});
  }

  addWord(serverID: string, word: string) {
    let url: string = `${this.api}/servers/add_flagged_words/${serverID}`;
    let data = [word];
    return this.http.put(url, data);
  }

  getAllMembers(serverID: string): Observable<string[]> {
    let url: string = `${this.api}/servers/get_all_members/${serverID}`;
    return this.http.get<string[]>(url);
  }

  getMemberTotalFlaggedWords(serverID: string, userID: string): Observable<string> {
    let url: string = `${this.api}/users/get_total_flagged_words/${serverID}/${userID}`;
    return this.http.get(url, { responseType: 'text' });
  }

  getMemberTotalWords(serverID: string, userID: string): Observable<string> {
    let url: string = `${this.api}/users/get_total_words/${serverID}/${userID}`;
    return this.http.get(url, { responseType: 'text' });
  }

  getMemberWords(serverID: string, userID: string): Observable<any> {
    let url: string = `${this.api}/users/get_flagged_words_count/${serverID}/${userID}`;
    return this.http.get(url);
  }


}
