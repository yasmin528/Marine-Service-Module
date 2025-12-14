import { VacancyService } from './../../../core/services/vacancy.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-vacancy',
  templateUrl: './new-vacancy.component.html',
  styleUrls: ['./new-vacancy.component.css'],
  imports: [  ReactiveFormsModule , CommonModule]
})
export class NewVacancyComponent implements OnInit {
  @Output() closeForm = new EventEmitter<boolean>();

  vacancyForm!: FormGroup;
  VacancyService = inject(VacancyService);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.vacancyForm = this.fb.group({
      code: [{ value: '87', disabled: true }],
      jobName: ['', Validators.required],
      requestDate: ['', Validators.required],
      existEmployees: [''],
      requiredEmployees: [''],
      budgetManpower: [''],
      jobType: ['', Validators.required],
      projectName: [''],
      recruitmentReason: ['', Validators.required],
      requiredTools: ['', Validators.required],
      educationalQualification: [''],
      experienceYears: [''],
      languages: [''],
      personalSkills: [''],
      computerSkills: [''],
      requiredCourses: [''],
      other: [''],
      requiredDate: ['', Validators.required],
      jobRequestTemplate: [''],
      jobDescription: [''],
      comments: ['']
    });
  }

  close() {
    this.closeForm.emit(false);
  }

  saveVacancy() {
    if (this.vacancyForm.invalid) {
      this.vacancyForm.markAllAsTouched();
      return;
    }
    const vacancyData = this.vacancyForm.getRawValue();
    this.VacancyService.addVacancy(vacancyData);
    console.log('Vacancy Data:', vacancyData);

    this.closeForm.emit(false); 
  }

  cancel() {
    this.closeForm.emit(false);
  }
}
