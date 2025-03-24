import { appsettings } from '../settings/appsettings';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitialTriageService {
 
  private apiURL: string = appsettings.apiUrl;
  private bonitaToken = '';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('redirect', 'false');

    return this.http.post(`${this.apiURL}/loginservice`, body.toString(), {
      headers,
      withCredentials: true,
      observe: 'response'
    }).pipe(
      tap(response => {
        const token = response.headers.get('X-Bonita-API-Token');
        if (token) {
          this.bonitaToken = token;
          console.log('✅ Login exitoso. Token:', token);
        } else {
          console.warn('⚠️ No se recibió token');
        }
      })
    );
  }
  getToken(): string {
    return this.bonitaToken;
  }
}
