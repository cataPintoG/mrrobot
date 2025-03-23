import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  idCase: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      console.log('Parámetros recibidos:', params.keys);
      params.keys.forEach(key => {
        console.log(`${key}: ${params.get(key)}`);
      });
    });
  }

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
