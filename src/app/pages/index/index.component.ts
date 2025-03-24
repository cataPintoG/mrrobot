import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  

  public displayedColumns: string[] = ['Id', 'Name', 'Age' ,'MonthlySalary', 'AnnualSalary'];
  public errorMessage: string | null = null;

  constructor(private router: Router) {}

 
}
