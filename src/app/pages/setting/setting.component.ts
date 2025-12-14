import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  imports: [ReactiveFormsModule , CommonModule]
})
export class SettingComponent implements OnInit {

 settingsForm!: FormGroup;

  option2List = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      settingOption1: [''],          
      settingOption2: ['option1']  
    });
  }

  onSubmit() {
    console.log(this.settingsForm.value);
  }
}
