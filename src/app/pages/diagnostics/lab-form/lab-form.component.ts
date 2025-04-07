import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BonitaService } from './../../../services/bonita.service'; 
import { appsettings } from '../../../settings/appsettings';

@Component({
  selector: 'app-lab-form',
  standalone: true,
  imports: [FormsModule,CommonModule, MatSnackBarModule],
  templateUrl: './lab-form.component.html',
  styleUrl: './lab-form.component.css'
})
export class LabFormComponent {
    // Datos del Examen
    examName: string = '';
    examInfo: string = '';
    contraindications: string = '';
    prerequisites: string = '';
    patientAuthorization: boolean = false;
    clinicalHistoryRef: string = '';
    examResults: string = '';
    patientId: string = '';
    taskId: string = '';
    private username: string = appsettings.usernameLab;
    private password: string = appsettings.passwordLab;
  
    constructor(private snackBar: MatSnackBar, private route: ActivatedRoute,   private bonitaService: BonitaService){}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.taskId = params['id'];     
        console.log('Id recibido',this.taskId) 
      });

      if (this.taskId) {

        this.bonitaService.login(this.username, this.password).subscribe({
          next: (res) => {            
            console.log('✅ Login exitoso');
            this.bonitaService.getTaskDetails(this.taskId).subscribe({
              next: (task) => {
                const caseId = task.rootCaseId || task.caseId;          
                this.bonitaService.getBusinessVAriable(caseId).subscribe({
                  next: (result) => {
                    const historia = result;
                    this.patientId = historia?.numero_identificacion;
                    this.clinicalHistoryRef = historia?.persistenceId;
                    console.log('Número de identificación del paciente:', this.patientId);
                  },
                  error: (err) => {
                    console.error('❌ Error al obtener variable de caso:', err);
                  }
                });
              },
              error: (err) => {
                console.error('❌ Error al obtener detalles de la tarea:', err);
              }
            });            
          },
          error: err => console.error('❌ Error en login', err)
        });
      }
    }
    // Lista simple de exámenes
    examTypes = [
      { value: 'hemograma', label: 'Hemograma' },
      { value: 'glicemia', label: 'Glucosa' },
      { value: 'creatinina', label: 'Creatinina' },      
      { value: 'colesterol-total', label: 'Colesterol Total' },
      { value: 'trigliceridos', label: 'Triglicéridos' },
      { value: 'electrolitos', label: 'Electrolitos' },
      { value: 'uroanalisis', label: 'Uroanálisis' },
      { value: 'prueba-embarazo', label: 'Prueba de Embarazo' },
      { value: 'vih', label: 'Prueba de VIH' }
    ];
  
  
    onSubmit() {
      const labPayload = {
        examenLaboratorioInput: {
          identificacion_paciente: this.patientId,
          referencia_historia_clinica: this.clinicalHistoryRef,
          nombres: this.examName,
          informacion_examenes: this.examInfo,
          contra_indicaciones: this.contraindications,
          autorizacion_paciente: this.patientAuthorization           
        }
      };
      if (this.taskId) {
        console.log('📌 taskId recibido:', this.taskId);
  
        // ✅ Hacer login y luego pedir el contrato
        this.bonitaService.login(this.username, this.password).subscribe({
          next: (res) => {            
            console.log('✅ Login exitoso');
            console.log("🚀 Enviando a ejecutar tarea con payload:", labPayload);
            this.bonitaService.executeUserTask(this.taskId, labPayload).subscribe({
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

