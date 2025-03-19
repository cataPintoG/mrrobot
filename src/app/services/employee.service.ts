import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Employee } from '../Models/Employee';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);
  private apiURL: string = appsettings.apiUrl + "employee/GetAllEmployees";
  private searchApiURL: string = appsettings.apiUrl + "employee/GetEmployeeById?id="; 

  constructor() { }

  listEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    if (id <= 0 || !Number.isInteger(id)) {
      return throwError(() => new Error('The ID must be a positive integer.'));
    }

    return this.http.get<Employee>(`${this.searchApiURL}${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 429) {
      return throwError(() => ({
        status: error.status,
        detail: error.error.detail || 'Too many requests. Please try again later.'
      }));
    }

    if (error.status === 404) {
      return throwError(() => ({
        status: error.status,
        detail: error.error.detail || "Recourse not found."
      }));
    }
    return throwError(() => new Error('Error fetching employees'));
  }
}
