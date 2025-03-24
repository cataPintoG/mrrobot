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
      if (this.taskId) {
        console.log('📌 taskId recibido:', this.taskId);

        // ✅ Hacer login y luego pedir el contrato
        this.bonitaService.login(this.username, this.password).subscribe({
          next: (res) => {
            console.log('✅ Login exitoso. Respuesta completa:', res);
            const token = this.bonitaService.getToken();
            console.log('📌 Token guardado:', token);
          },
          error: err => console.error('❌ Error en login', err)
        });
      }
    });
  }

  /**this.bonitaService.getContract(this.taskId).subscribe({
              next: contract => {
                console.log('📄 Contrato recibido:', contract);
                // Aquí puedes usar el contrato para armar el formulario dinámicamente si quieres
              },
              error: err => console.error('❌ Error obteniendo contrato', err)
            }); */

  // Método para enviar datos a Bonita
  submitTriage() {
    const triageData = {
      temperature: this.temperature,
      bloodPressure: {
        systolic: this.bloodPressureSystolic,
        diastolic: this.bloodPressureDiastolic
      },
      heartRate: this.heartRate,
      respiratoryRate: this.respiratoryRate,
      oxygenSaturation: this.oxygenSaturation,
      consciousnessLevel: this.consciousnessLevel,
      painLevel: this.painLevel,
      chiefComplaint: this.chiefComplaint,
      mainSymptoms: this.mainSymptoms,
      observations: this.triageObservations
    };
  }  
}
