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
      withCredentials: true      
    }).pipe(
      tap({
        next: (response) => {          
          console.log('✅ Login exitoso. Token:');        
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
    console.log("🧪 TaskIdFrontent:", taskId); 
    console.log("🧪 Token leído en frontend:", token); 
    console.log("📦 Cookies en el frontend:", document.cookie);
    return this.http.post(
      `${this.apiUrl}/execute-task/${taskId}`,
      payload,
      { withCredentials: true } // 👈 sin headers extra
    );

  }

  getCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : '';
  }

  getTaskDetails(taskId: string) {
    return this.http.get<any>(`${this.apiUrl}/task/${taskId}`, {
      withCredentials: true
    }).pipe(
      tap({
        next: (response) => {          
        console.log('✅ Login exitoso. Token:');        
      },
      error: (err) => {
        console.error('❌ Error en Buscar actividad HTTP:');
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
    }));
  }

  getCaseVariable(caseId: string, variableName: string) {
    return this.http.get<any>(`${this.apiUrl}/case-variable/${caseId}/${variableName}`,{
      withCredentials:true
    });
  }
}
