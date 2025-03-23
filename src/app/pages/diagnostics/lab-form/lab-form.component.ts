import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lab-form',
  imports: [FormsModule,CommonModule],
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
  

    // Lista simple de exámenes
    examTypes = [
      { value: 'tac-cerebral', label: 'TAC Cerebral' },
      { value: 'tac-torax', label: 'TAC de Tórax' },
      { value: 'tac-abdominal', label: 'TAC Abdominal' },
      { value: 'eco-abdominal', label: 'Ecografía Abdominal' },
      { value: 'eco-pelvica', label: 'Ecografía Pélvica' },
      { value: 'eco-obstetrica', label: 'Ecografía Obstétrica' },
      { value: 'rx-torax', label: 'Radiografía de Tórax' },
      { value: 'rx-columna', label: 'Radiografía de Columna' },
      { value: 'rmn-cerebral', label: 'Resonancia Magnética Cerebral' },
      { value: 'rmn-columna', label: 'Resonancia Magnética de Columna' }
    ];
  
  
    onSubmit() {
      console.log('Formulario enviado', {
        examData: {
          name: this.examName,
          info: this.examInfo,
          contraindications: this.contraindications,
          prerequisites: this.prerequisites,
          patientAuthorization: this.patientAuthorization,
          clinicalHistoryRef: this.clinicalHistoryRef,
          examResults: this.examResults,
          patientId: this.patientId
        }
      });
    }
}
