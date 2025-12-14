import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { VisaSponserService } from '../../../core/services/visaSponser.service';

@Component({
  selector: 'app-add-seaferer',
  standalone: true,
  templateUrl: './add-seaferer.component.html',
  styleUrls: ['./add-seaferer.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddSeafererComponent implements OnInit {
  fb = inject(FormBuilder);
  @Output() closeForm = new EventEmitter<void>();
  seafarerForm!: FormGroup;
  empList: Employee[] = [];
  visaSponsorList: VisaVendor[] = [];
  empService = inject(EmployeeService);
  vendorService = inject(VisaSponserService);
  activeTab: string = 'personalInfo';

  ngOnInit(): void {
    this.buildForm();
    this.loadEmployees();
    this.loadVisaSponsors();
  }
  private loadEmployees(): void {
     this.empService.fillEmployee().subscribe({
      next: res => this.empList = res,
      error: err => console.error('Error loading employees', err)
    });
  }

  private loadVisaSponsors(): void {
    this.vendorService.fillVendor().subscribe({
      next: res => this.visaSponsorList = res,
      error: err => console.error('Error loading vendors', err)
    });
  }
  private buildForm(): void {
    this.seafarerForm = this.fb.group({

      personalInfo: this.fb.group({
        Id: [null],

        EmployeeNameEN: [''],
        EmployeeNameAR: [''],
        EmployeeCode: [''],

        Nationality: [''],
        Gender: [''],
        Religion: [''],

        BirthDate: [''],
        BirthPlace: [''],
        Age: [{ value: '', disabled: true }],

        MaritalStatus: [''],
        NameOfSpouse: [''],
        NoOfChildren: [0],

        NationalId: [''],
        NationalIdExpiryDate: [''],

        BodyWeight: [],
        Height: [],
        BloodType: [''],

        NearestAirport: [''],
        Declaration: ['']
      }),
      contactInfo: this.fb.group({
        Email: [''],
        Phone: [''],
        Mobile: [''],
        Address: [''],
        PermanentAddressHomeCountry: [''],
        BusinessPhone: [''],
        SkypeID: [''],

        KinName: [''],
        KinPhone: [''],
        KinEmail: [''],

        ContactNumberHomeCountry: [''],
        ContactNameAndNumberDuringEmergenciesUAE: [''],
        ContactNameAndNumberDuringEmergenciesHome: ['']
      }),
      employmentInfo: this.fb.group({
        EmpId: [null, Validators.required],
        JobNameEN: [''],
        JobNameAR: [''],

        Company: [''],
        WorkLocation: [''],
        EmpManager: [''],

        EmploymentDate: [''],
        PropationEndDate: [''],

        PostCategoryLevel: [''],
        Tier: [''],
        Status: [1],

        Salary: [],
        JoiningCost: [],
        PreJoiningCost: [],
        OnBoardingCost: []
      }),
      documentsInfo: this.fb.group({
        PassportNumber: [''],
        PassPortIssueDate: [''],
        PassportExpireDate: [''],

        VisaSponsorId: [null, Validators.required],
        SponsorName: [''],
        VisaIssueDate: [''],
        VisaExpiryDate: [''],
        VisaUAEIdNO: [''],
        ResidenceNumber: [''],

        SeamanBookNO: [''],
        SeamanIssueDate: [''],
        SeamanExpiryDate: [''],

        CicpaNO: [''],
        CicpaIssueDate: [''],
        CicpaExpiryDate: [''],

        SyndicateCardNumber: [''],
        SyndicateExpirationDate: [''],

        DrivingLicenseNumber: [''],
        WorkPermit: [''],
        PermitNumber: [''],
        PermitExpirationDate: [''],

        MilitaryServiceExpireDate: ['']
      }),
      medicalInfo: this.fb.group({
        InsuranceDate: [''],
        ConfirmationInsuranceDate: [''],
        InsuranceNumber: [''],
        InsuranceTitle: [''],
        InsuranceOffice: [''],

        MedicalInsuranceNo: [''],
        MedicalInsuranceDate: [''],
        MedicalInsuranceAmount: [],

        SignedOffFromAShipDueToMedicalReason: [false],
        SignedOffFromAShipDueToMedicalReasonComment: [''],

        UndergoneAnyMdicalOperation: [false],
        UndergoneAnyMdicalOperationComment: [''],

        DoctorConsultation: [false],
        DoctorConsultationComment: [''],

        HealthOrDisabilityProblem: [false],
        HealthOrDisabilityProblemComment: [''],

        InquiryOrInvolvedMaritimeAccident: [false],
        InquiryOrInvolvedMaritimeAccidentComment: [''],

        LicenseSuspendedOrRevoked: [false],
        LicenseSuspendedOrRevokedComment: [''],

        Notes: [''],
        Remarks: ['']
      })
    });
  }


  saveSeafarerData(): void {
    if (this.seafarerForm.invalid) {
      this.seafarerForm.markAllAsTouched();
      return;
    }

    const payload = this.seafarerForm.getRawValue();
    console.log('SAVE PAYLOAD:', payload);
  }

  closeModal(): void {
    this.closeForm.emit();
  }

}
