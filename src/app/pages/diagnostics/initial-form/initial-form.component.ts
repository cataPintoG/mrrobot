import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BonitaService } from './../../../services/bonita.service'; 
import { appsettings } from '../../../settings/appsettings';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-initial-form',
  standalone: true,
  imports: [FormsModule,MatSnackBarModule,CommonModule],
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
  mainSymptoms: string = '';
  triageObservations: string = '';
  taskId: string = '';
  
  private username: string = appsettings.username;
  private password: string = appsettings.password;

  constructor(private route: ActivatedRoute,   private bonitaService: BonitaService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.taskId = params['id'];     
      console.log('Id recibido',this.taskId) 
    });
  }

 

  submitTriage(form: NgForm) {
    if (form.invalid) {
      this.snackBar.open('Por favor complete todos los campos obligatorios.', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    const triagePayload = {
      historiaClinicaInput: {
        numero_identificacion: this.identification || "",
        edad: this.age ?? 0,
        nombre: this.fullName || "",
        fecha_ingreso: this.admissionDate 
          ? new Date(this.admissionDate).toISOString() 
          : new Date().toISOString(),     
        direccion: this.address || "",
        numero_telefono: this.phoneNumber || "",
        regimen: this.regime || "",
        estado_afiliado: this.affiliateStatus || "",
        diagnostico: this.diagnosis || "",
        temperatura: this.temperature ?? 0,
        presion_sistolica: this.bloodPressureSystolic ?? 0,
        presion_diastolica: this.bloodPressureDiastolic ?? 0,
        frecuencia_cardiaca: this.heartRate ?? 0,
        saturacion_oxigeno: this.oxygenSaturation ?? 0,
        nivel_consciencia: this.consciousnessLevel || "",
        nivel_dolor: this.painLevel ?? 0,
        motivo_consulta: this.chiefComplaint || "",
        sintomas: this.mainSymptoms || ""
      }
    };

    if (this.taskId) {
      console.log('📌 taskId recibido:', this.taskId);

      // ✅ Hacer login y luego pedir el contrato
      this.bonitaService.login(this.username, this.password).subscribe({
        next: (res) => {            
          console.log('✅ Login exitoso');
          console.log("🚀 Enviando a ejecutar tarea con payload:", triagePayload);
          this.bonitaService.executeUserTask(this.taskId, triagePayload).subscribe({
            next: (res) => {
              console.log('✅ Tarea ejecutada correctamente', res);
              this.snackBar.open('¡Has terminado la tarea! Refresca la lista si es necesario.', 'Cerrar', {
                duration: 4000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
              });
            },
            error: (err) => {
              console.error('❌ Error al ejecutar la tarea', err);
              this.snackBar.open('Error al enviar a bonita.', 'Cerrar', {
                duration: 4000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error']
              });
            }
          });
        },
        error: err => console.error('❌ Error en login', err)
      });
    }  
  }  
}
