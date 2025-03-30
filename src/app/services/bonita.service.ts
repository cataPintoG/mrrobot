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
    
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('redirect', 'false');
      console.log("🌐 URL del proxy ngrok:", this.apiUrl);
      console.log("📤 Enviando login con:", body.toString());

    return this.http.post(`${
        this.apiUrl
      }/login`, body.toString(), {
      headers,
      withCredentials: true,
      observe: 'response'
    }).pipe(
      tap({
        next: (response) => {
          const token = response.headers.get('X-Bonita-API-Token');
          if (token) {
            this.bonitaToken = token;
            console.log('✅ Login exitoso. Token:', token);
          } else {
            console.warn('⚠️ Login respondió sin token.');
          }
        },
        error: (err) => {
          console.error('❌ Error en login HTTP:');
          console.error('🔴 Status:', err.status);
          console.error('📛 StatusText:', err.statusText);
          console.error('📍 URL:', err.url);
          console.error('🧾 Headers:', err.headers);
          console.error('📦 Error completo:', err);
          if (err.error instanceof ProgressEvent) {
            console.error('🔌 Error de red/CORS (ProgressEvent)');
          } else {
            console.error('🧠 Detalles del error:', err.error);
          }
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
