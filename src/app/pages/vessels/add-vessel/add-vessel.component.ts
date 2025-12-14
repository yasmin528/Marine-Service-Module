import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-vessel',
  templateUrl: './add-vessel.component.html',
  styleUrls: ['./add-vessel.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddVesselComponent  {
 @Output() closeForm = new EventEmitter<boolean>();

  close(){
    this.vesselForm.reset();
    this.closeForm.emit(false);
  }
 vesselForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.vesselForm = this.fb.group({
      name: ['', Validators.required],
      owner: ['', Validators.required],
      mms: [''],
      ourFleet: [''],
      manager: ['', Validators.required],
      callSign: [''],
      imo: [''],
      dwt: [''],
      phone: [''],
      builtYear: [''],
      grt: [''],
      email: ['', Validators.email],
      vesselType: ['', Validators.required],
      teu: [''],
      cargoPump: [''],
      flag: ['', Validators.required],
      cargoTanks: [''],
      engineModel: [''],
      geared: [''],
      cargoGear: [''],
      engineType: [''],
      dims: [''],
      speed: [''],
      powerHp: [''],
      ecdisType: [''],
      powerKwt: [''],
      comment: ['']
    });
  }

  saveVessel() {
    if (this.vesselForm.invalid) {
      this.vesselForm.markAllAsTouched(); 
      return;
    }

    console.log(this.vesselForm.value);
  }


}
