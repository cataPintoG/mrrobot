import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Models/Employee';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  
  private employeeService = inject(EmployeeService);
  public listEmployees: Employee[] = [];
  public displayedColumns: string[] = ['Id', 'Name', 'Age' ,'MonthlySalary', 'AnnualSalary'];
  public errorMessage: string | null = null;

  constructor(private router: Router) {}

  getEmployees(searchValue: string) {
    searchValue = searchValue.trim();

    // If the field is empty, fetch all employees.
    if (searchValue === '') {
      this.employeeService.listEmployee().subscribe(
        (employees) => {
          this.listEmployees = employees;
          this.errorMessage = "";
        },
        (error) => {
          console.error(error);
          this.listEmployees = [];
          this.errorMessage = error.detail || "Error loading employees.";
        }
      );
      return;
    }

    const employeeId = parseInt(searchValue, 10);
    
    // If the ID is invalid (non-numeric or ≤ 0), show an error and exit.
    if (isNaN(employeeId) || employeeId <= 0) {
      this.listEmployees = [];
      this.errorMessage = "Enter a valid ID (greater than 0).";
      return;
    }

    // If the ID is valid, fetch only that employee
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (employee) => {
        this.listEmployees = [employee];
        this.errorMessage = "";
      },
      (error) => {
        console.error(error);
        console.error(error.status);
        this.listEmployees = [];

        this.errorMessage = error.detail || "An error occurred while fetching employee data.";
      }
    );
  }
}
