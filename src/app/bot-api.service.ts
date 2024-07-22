import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BotApiService {
  private api = '/bot_api';

  constructor(private http: HttpClient) {}

  checkIfServerExists(serverID: string): Observable<boolean> {
    let url: string = `${this.api}/servers/check_if_exists`;
    let params = new HttpParams().set('dc_server_id', serverID);

    return this.http.get<{ exists: boolean }>(url, { params }).pipe(
      map(response => response.exists)
    );
  }

  getServerTotalWords(serverID: string): Observable<string> {
    let url: string = `${this.api}/servers/get_total_words`;
    let params = new HttpParams().set('dc_server_id', serverID);

    return this.http.get<{ total_words: number }>(url, { params }).pipe(
      map(response => response.total_words.toString())
    );
  }

  getServerTotalFlaggedWords(serverID: string): Observable<string> {
    let url: string = `${this.api}/servers/get_total_flagged_words`;
    let params = new HttpParams().set('dc_server_id', serverID);

    return this.http.get<{ total_flagged_words: number }>(url, { params }).pipe(
      map(response => response.total_flagged_words.toString())
    );
  }

  getServerWords(serverID: string): Observable<any> {
    let url: string = `${this.api}/servers/get_flagged_words`;
    let params = new HttpParams().set('dc_server_id', serverID);

    return this.http.get<{ words: object }>(url, { params }).pipe(
      map(response => response.words)
    );
  }

  deleteWord(serverID: string, word: string) {
    let url: string = `${this.api}/servers/unflag_words`;
    let params = new HttpParams().set('dc_server_id', serverID);

    return this.http.patch(url, [word], {params}).pipe(
      map(response => response)
    );
  }

  addWord(serverID: string, word: string) {
    let url: string = `${this.api}/servers/flag_words`;
    let params = new HttpParams().set('dc_server_id', serverID);

    return this.http.patch(url, [word], { params }).pipe(
      map(response => response)
    );
  }

  getAllMembers(serverID: string): Observable<string[]> {
    let url: string = `${this.api}/servers/get_members_ids`;
    let params = new HttpParams().set('dc_server_id', serverID);

    return this.http.get<{ ids: string[] }>(url, { params }).pipe(
      map(response => response.ids)
    );
  }

  getMemberTotalFlaggedWords(serverID: string, userID: string): Observable<string> {
    let url: string = `${this.api}/users/get_total_flagged_words`;
    let params = new HttpParams()
      .set('dc_server_id', serverID)
      .set('dc_user_id', userID)

    return this.http.get<{ total_flagged_words: number }>(url, { params }).pipe(
      map(response => response.total_flagged_words.toString())
    );
  }

  getMemberTotalWords(serverID: string, userID: string): Observable<string> {
    let url: string = `${this.api}/users/get_total_words`;
    let params = new HttpParams()
      .set('dc_server_id', serverID)
      .set('dc_user_id', userID)

    return this.http.get<{ total_words: number }>(url, { params }).pipe(
      map(response => response.total_words.toString())
    );
  }

  getMemberWords(serverID: string, userID: string): Observable<any> {
    let url: string = `${this.api}/users/get_flagged_words`;
    let params = new HttpParams()
      .set('dc_server_id', serverID)
      .set('dc_user_id', userID)

    return this.http.get<{ words: object }>(url, { params }).pipe(
      map(response => response.words)
    );
  }


}
