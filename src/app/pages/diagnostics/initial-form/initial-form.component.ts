import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BonitaService } from './../../../services/bonita.service'; 
import { appsettings } from '../../../settings/appsettings';

@Component({
  selector: 'app-initial-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './initial-form.component.html',
  styleUrl: './initial-form.component.css'
})
export class InitialFormComponent implements OnInit {
  identification: string = '';
  age: number | null = null;
  fullName: string = '';
  admissionDate: string = '';
  sex: string = '';
  address: string = '';
  phoneNumber: string = '';
  regime: string = '';
  affiliateStatus: string = '';
  diagnosis: string = '';  
  temperature: number = 0;
  bloodPressureSystolic: number = 0;
  bloodPressureDiastolic: number = 0;
  heartRate: number = 0;
  respiratoryRate: number = 0;
  oxygenSaturation: number = 0;
  consciousnessLevel: string = '';
  painLevel: number = 0;

  chiefComplaint: string = '';
  mainSymptoms: string[] = [];
  triageObservations: string = '';
  taskId: string = '';
  
  private username: string = appsettings.username;
  private password: string = appsettings.password;

  constructor(private route: ActivatedRoute,   private bonitaService: BonitaService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.taskId = params['id'];     
      console.log('Id recibido',this.taskId) 
    });
  }

 

  submitTriage() {
    const triagePayload = {
      historiaMedicaInput: {
        temperature: 0,
        bloodPressure: {
          systolic: 0,
          diastolic: 0
        },
        heartRate: 0,
        respiratoryRate: 0,
        oxygenSaturation: 0,
        consciousnessLevel: '',
        painLevel: 0,
        chiefComplaint: '',
        mainSymptoms: [],
        observations: '',
        identificacion: this.identification
      }
    };

    if (this.taskId) {
      console.log('📌 taskId recibido:', this.taskId);

      // ✅ Hacer login y luego pedir el contrato
      this.bonitaService.login(this.username, this.password).subscribe({
        next: (res) => {            
          console.log('✅ Login exitoso');
          this.bonitaService.executeUserTask(this.taskId, triagePayload).subscribe({
            next: (res) => {
              console.log('✅ Tarea ejecutada correctamente', res);
            },
            error: (err) => {
              console.error('❌ Error al ejecutar la tarea', err);
            }
          });
        },
        error: err => console.error('❌ Error en login', err)
      });
    }  
  }  
}
