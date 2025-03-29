import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonitaService {

  private apiUrl: string = environment.apiUrl;
  private bonitaToken = '';

  constructor(private http: HttpClient) {}
  
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    console.log(this.apiUrl);
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('redirect', 'false');

    return this.http.post(`${
        this.apiUrl
      }/login`, body.toString(), {
      headers,
      withCredentials: true,
      observe: 'response'
    }).pipe(
      tap(response => {
        const token = response.headers.get('X-Bonita-API-Token');
        if (token) {
          this.bonitaToken = token;
          console.log('✅ Login exitoso. Token:', token);
        }
      })
    );
  }

  getToken(): string {
    return this.bonitaToken;
  }

  executeUserTask(taskId: string, payload: any): Observable<any> {
    const token = this.getCookie('X-Bonita-API-Token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Bonita-API-Token': token
    });

    return this.http.post(
      `${this.apiUrl}/API/bpm/userTask/${taskId}/execution?assign=true`,
      payload,
      { headers, withCredentials: true }
    );

  }

  getCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : '';
  }

  getContract(taskId: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-Bonita-API-Token': this.bonitaToken
    });

    return this.http.get(`${this.apiUrl}/API/bpm/userTask/${taskId}/contract`, {
      headers,
      withCredentials: true
    });
  }
}
