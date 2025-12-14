import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { SeafarerService } from '../../../core/services/seaferer.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { VisaSponserService } from '../../../core/services/visaSponser.service';

@Component({
  selector: 'app-seafarer-form',
  templateUrl: './seafarer-form.html',
  styleUrls: ['./seafarer-form.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SeafarerForm implements OnInit, OnChanges {

  @Input() editData: any;

  @Output() closeForm = new EventEmitter<void>();
  @Output() saveDataEvent = new EventEmitter<any>();
  seafarerService = inject(SeafarerService);
  title = 'Add New Seafarer';

  seafarerForm!: FormGroup;
  personalForm!: FormGroup;
  contactForm!: FormGroup;
  offshoreForm!: FormGroup;
  healthForm!: FormGroup;
  salaryForm!: FormGroup;
  professionalHistoryForm!: FormGroup;
  referencesForm!: FormGroup;

  newEducationGroup!: FormGroup;
  newCertificateGroup!: FormGroup;
  newLanguageGroup!: FormGroup;
  newDpLicenseGroup!: FormGroup;
  newStcwGroup!: FormGroup;
  newWorkExperienceGroup!: FormGroup;
  referenceInputGroup!: FormGroup;

  activeTab: string = 'personal';
  empService = inject(EmployeeService);
  employees: Employee[] = [];
  VisaSponserService = inject(VisaSponserService);
  sponsors: VisaVendor[] = [];

  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['editData'] && changes['editData'].currentValue) {
      const data = changes['editData'].currentValue;

      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        console.log('NG_ON_CHANGES: Patching form with new data:', data);
        this.patchFormForEdit(data);
        this.title = 'Edit Seafarer';
      }
    }
  }

  ngOnInit(): void {
    this.initNestedForms();
    this.initMasterForm();
    this.initDynamicInputGroups();
    this.loadDropdownData();
    this.salaryForm.valueChanges.subscribe(() => {
      this.calculateNetSalary();
    });
    this.personalForm.get('dob')?.valueChanges.subscribe(dob => {
      const age = this.calculateAge(dob);
      this.personalForm.patchValue({ age }, { emitEvent: false });
      console.log('Calculated age:', age);
    });
  }

  calculateNetSalary(): void {
    const employeeSalary = parseFloat(this.salaryForm.get('employeeSalary')?.value || 0);
    const dailyPay = parseFloat(this.salaryForm.get('dailyPay')?.value || 0);
    const hourPay = parseFloat(this.salaryForm.get('hourPay')?.value || 0);

    const totalEarning = employeeSalary + dailyPay * 30 + hourPay * 8 * 30;
    const totalDeduction = 0;
    const netSalary = totalEarning - totalDeduction;

    this.salaryForm.get('totalEarning')?.setValue(totalEarning.toFixed(2), { emitEvent: false });
    this.salaryForm.get('totalDeduction')?.setValue(totalDeduction.toFixed(2), { emitEvent: false });
    this.salaryForm.get('netSalary')?.setValue(netSalary.toFixed(2), { emitEvent: false });
  }
  loadDropdownData(): void {
    this.empService.fillEmployee().subscribe(data => {
      this.employees = data;
    }, error => {
      console.error('Failed to load employees:', error);
    });

    this.VisaSponserService.fillVendor().subscribe(data => {
      this.sponsors = data;
    }, error => {
      console.error('Failed to load sponsors:', error);
    });
  }
  get educationArray(): FormArray {
    return this.seafarerForm.get('education') as FormArray;
  }

  get certificatesArray(): FormArray {
    return this.seafarerForm.get('certificates') as FormArray;
  }

  get languagesArray(): FormArray {
    return this.seafarerForm.get('languages') as FormArray;
  }

  get dpLicensesArray(): FormArray {
    return this.seafarerForm.get('dpLicenses') as FormArray;
  }

  get dpLicensesFormGroups(): FormGroup[] {
    return this.dpLicensesArray.controls as FormGroup[];
  }

  get stcwArray(): FormArray {
    return this.seafarerForm.get('stcw') as FormArray;
  }

  get stcwFormGroups(): FormGroup[] {
    return this.stcwArray.controls as FormGroup[];
  }

  get workExperienceArray(): FormArray {
    return this.seafarerForm.get('workExperience') as FormArray;
  }

  get workExperienceFormGroups(): FormGroup[] {
    return this.workExperienceArray.controls as FormGroup[];
  }

  get referencesArray() {
    return this.referencesForm.get('references') as FormArray;
  }

  createReference(data: any = {}): FormGroup {
    return this.fb.group({
      refName: [data.refName || ''],
      refCompany: [data.refCompany || ''],
      refCountry: [data.refCountry || ''],
      refTelFax: [data.refTelFax || ''],
      refEmail: [data.refEmail || '',]
    });
  }

  addReference(): void {
    if (this.referenceInputGroup.valid) {
      const newRef = this.createReference(this.referenceInputGroup.value);
      this.referencesArray.push(newRef);
      this.referenceInputGroup.reset();
    } else {
      this.referenceInputGroup.markAllAsTouched();
    }
  }

  removeReference(index: number): void {
    this.referencesArray.removeAt(index);
  }

  private initNestedForms(): void {
    this.personalForm = this.fb.group({
      employee: [''],
      nationality: [''],
      dob: [''],
      age: [{ value: '', disabled: true }],
      pob: [''],
      religion: [''],
      maritalStatus: [''],
      spouseName: [''],
      childrenCount: [],
      weight: [],
      height: [],
      nearestAirport: [''],
      remarks: [''],
      dateOfHire: [''],
      passportNo: [''],
      passportIssueDate: [''],
      passportExpiryDate: [''],
      rank: [''],
      visaSponsor: [''],
      visaNo: [''],
      visaIssueDate: [''],
      visaExpiryDate: [''],
      residenceNumber: [''],
      healthInsuranceExpiry: [''],
    });

    this.contactForm = this.fb.group({
      email: [''],
      permanentAddress: [''],
      homeContact: [''],
      emergencyContactUAE: [''],
      emergencyContactHome: [''],
    });

    this.offshoreForm = this.fb.group({
      seamanBookNo: [''],
      seamanIssueDate: [''],
      seamanExpiryDate: [''],
      cicpaNo: [''],
      cicpaIssueDate: [''],
      cicpaExpiryDate: [''],
    });

    this.healthForm = this.fb.group({
      signedOffFromAShipDueToMedicalReason: [false],
      signedOffFromAShipDueToMedicalReasonComment: [''],
      undergoneMedicalOperation: [false],
      medicalOperationDetails: [''],
      consultedDoctorLast12Months: [false],
      consultedDoctorDetails: [''],
      hasHealthOrDisabilityProblem: [false],
      disabilityDetails: [''],
    });

    this.salaryForm = this.fb.group({
      employeeSalary: [''],
      dailyPay: [''],
      hourPay: [''],
      delayHourPay: [''],
      overtimeHourPay: [''],
      currency: [''],
      paymentWay: [''],
      totalEarning: [{ value: '0.00', disabled: true }],
      totalDeduction: [{ value: '0.00', disabled: true }],
      netSalary: [{ value: '0.00', disabled: true }],
    });

    this.professionalHistoryForm = this.fb.group({
      courtOfEnquiryOrAccident: [false],
      courtOfEnquiryOrAccidentDetails: [''],
      licenseSuspendedOrRevoked: [false],
      licenseSuspendedOrRevokedDetails: [''],
    });

    this.referenceInputGroup = this.fb.group({
      refName: [''],
      refCompany: [''],
      refCountry: [''],
      refTelFax: [''],
      refEmail: ['']
    });

    this.referencesForm = this.fb.group({
      references: this.fb.array([])
    });
  }

  private initMasterForm(): void {
    this.seafarerForm = this.fb.group({
      personal: this.personalForm,
      contact: this.contactForm,
      offshore: this.offshoreForm,
      health: this.healthForm,
      education: this.fb.array([]),
      certificates: this.fb.array([]),
      languages: this.fb.array([]),
      stcw: this.fb.array([]),
      dpLicenses: this.fb.array([]),
      workExperience: this.fb.array([]),
      salary: this.salaryForm,
      professionalHistory: this.professionalHistoryForm,
      references: this.referencesForm
    });
  }

  private initDynamicInputGroups(): void {
    this.newEducationGroup = this.fb.group(this.createEducationGroup().controls);
    this.newCertificateGroup = this.fb.group(this.createCertificateGroup().controls);
    this.newLanguageGroup = this.fb.group(this.createLanguageGroup().controls);
    this.newDpLicenseGroup = this.fb.group(this.createNewDpLicenseInputGroup().controls);
    this.newStcwGroup = this.fb.group(this.createStcwGroup().controls);
    this.newWorkExperienceGroup = this.fb.group(this.createWorkExperienceGroup().controls);
  }

  private createEducationGroup(): FormGroup {
    return this.fb.group({
      degree: [''],
      major: [''],
      issueDate: [''],
      university: [''],
      country: ['']
    });
  }

  private createCertificateGroup(): FormGroup {
    return this.fb.group({
      capacity: [''],
      regulation: [''],
      issueDate: [''],
      expiryDate: [''],
      authority: [''],
      limitations: [''],
      country: ['']
    });
  }

  private createLanguageGroup(): FormGroup {
    return this.fb.group({
      language: [''],
      spoken: [''],
      written: [''],
      understood: [''],
      motherTongue: [''],
    });
  }

  private createStcwGroup(): FormGroup {
    return this.fb.group({
      name: [''],
      issueDate: [''],
      expiryDate: [''],
      institute: ['']
    });
  }

  private createNewDpLicenseInputGroup(): FormGroup {
    return this.fb.group({
      isBasic: [false],
      isAdv: [false],
      isFull: [false],
      isEto: [false],
      dpCert: [''],
      dpCertNo: [''],
      dpIssueDate: [''],
      dpExpiryDate: [''],
      dpAuthority: [''],
      dpCountry: [''],
      dpLimitations: ['']
    });
  }

  private createDpLicenseGroup(value: any): FormGroup {
    return this.fb.group({
      dpType: [value.dpType],
      dpCert: [value.dpCert],
      dpCertNo: [value.dpCertNo],
      dpIssueDate: [value.dpIssueDate],
      dpExpiryDate: [value.dpExpiryDate],
      dpAuthority: [value.dpAuthority],
      dpCountry: [value.dpCountry],
      dpLimitations: [value.dpLimitations]
    });
  }

  private createWorkExperienceGroup(): FormGroup {
    return this.fb.group({
      vesselName: [''],
      vesselType: [''],
      rank: [''],
      from: [''],
      to: [''],
      grt: [''],
      bhp: [''],
      company: [''],
    });
  }

  addEducation(): void {
    if (this.newEducationGroup.valid) {
      this.educationArray.push(this.fb.group(this.newEducationGroup.value));
      this.newEducationGroup.reset();
      this.newEducationGroup.get('degree')?.setErrors(null);
    }
  }

  removeEducation(index: number): void {
    this.educationArray.removeAt(index);
  }

  addCertificate(): void {
    if (this.newCertificateGroup.valid) {
      this.certificatesArray.push(this.fb.group(this.newCertificateGroup.value));
      this.newCertificateGroup.reset();
      this.newCertificateGroup.get('capacity')?.setErrors(null);
    }
  }

  removeCertificate(index: number): void {
    this.certificatesArray.removeAt(index);
  }

  addLanguage(): void {
    if (this.newLanguageGroup.valid) {
      this.languagesArray.push(this.fb.group(this.newLanguageGroup.value));
      this.newLanguageGroup.reset();
      this.newLanguageGroup.get('language')?.setErrors(null);
    }
  }

  removeLanguage(index: number): void {
    this.languagesArray.removeAt(index);
  }

  addStcw(): void {
    if (this.newStcwGroup.get('name')?.invalid) return;
    this.stcwArray.push(this.fb.group(this.newStcwGroup.value));
    this.newStcwGroup.reset();
  }

  removeStcw(index: number): void {
    this.stcwArray.removeAt(index);
  }

  addDpLicense(): void {
    if (this.newDpLicenseGroup.get('dpCert')?.invalid) return;

    const v = this.newDpLicenseGroup.getRawValue();
    const types: string[] = [];
    if (v.isBasic) types.push('BASIC');
    if (v.isAdv) types.push('ADV.');
    if (v.isFull) types.push('DP Operator(FULL LICENCE)');
    if (v.isEto) types.push('ETO/DP MAINTENANCE)');

    this.dpLicensesArray.push(this.createDpLicenseGroup({
      dpType: types,
      dpCert: v.dpCert,
      dpCertNo: v.dpCertNo,
      dpIssueDate: v.dpIssueDate,
      dpExpiryDate: v.dpExpiryDate,
      dpAuthority: v.dpAuthority,
      dpCountry: v.dpCountry,
      dpLimitations: v.dpLimitations
    }));

    this.newDpLicenseGroup.reset({
      isBasic: false,
      isAdv: false,
      isFull: false,
      isEto: false
    });
  }

  removeDpLicense(index: number): void {
    this.dpLicensesArray.removeAt(index);
  }

  addWorkExperience(): void {
    if (this.newWorkExperienceGroup.invalid) return;
    this.workExperienceArray.push(this.fb.group(this.newWorkExperienceGroup.value));
    this.newWorkExperienceGroup.reset();
  }

  removeWorkExperience(index: number): void {
    this.workExperienceArray.removeAt(index);
  }

  closeModal(): void {
    // Reset all dynamic FormArrays
    this.educationArray.clear();
    this.certificatesArray.clear();
    this.languagesArray.clear();
    this.dpLicensesArray.clear();
    this.stcwArray.clear();
    this.workExperienceArray.clear();
    this.referencesArray.clear();

    // Reset all nested forms
    this.personalForm.reset();
    this.contactForm.reset();
    this.offshoreForm.reset();
    this.healthForm.reset();
    this.salaryForm.reset();
    this.professionalHistoryForm.reset();
    this.referenceInputGroup.reset();

    // Reset dynamic input groups
    this.newEducationGroup.reset();
    this.newCertificateGroup.reset();
    this.newLanguageGroup.reset();
    this.newDpLicenseGroup.reset({
      isBasic: false,
      isAdv: false,
      isFull: false,
      isEto: false
    });
    this.newStcwGroup.reset();
    this.newWorkExperienceGroup.reset();

    // Reset main form
    this.seafarerForm.reset();

    // Reset component state
    this.editData = null;
    this.activeTab = 'personal';

    // Emit close event
    this.closeForm.emit();
  }


  saveSeafarerData(): void {
    if (this.seafarerForm.invalid) {
      this.markAllAsTouched(this.seafarerForm);
      return;
    }

    const payload = this.buildPayload();
    console.log('SAVE PAYLOAD:', payload);
    this.seafarerService.saveSeafarer(payload).subscribe({
      next: () => {
        alert('Seafarer saved successfully');
        this.closeModal();
      },
      error: err => {
        console.error(err);
        alert('Error while saving seafarer');
      }
    });
  }

  private markAllAsTouched(control: AbstractControl): void {
    control.markAllAsTouched();
    if (control instanceof FormGroup || control instanceof FormArray) {
      Object.values(control.controls).forEach(c => this.markAllAsTouched(c));
    }
  }




  private buildPayload() {
    const f = this.seafarerForm.getRawValue();

    return {
      entity: {
        EmpId: f.personal.employee,
        VisaSponsorId: f.personal.visaSponsor,

        SeamanBookNO: f.offshore.seamanBookNo,
        SeamanIssueDate: f.offshore.seamanIssueDate,
        SeamanExpiryDate: f.offshore.seamanExpiryDate,

        Remarks: f.personal.remarks,
        NearestAirport: f.personal.nearestAirport,
        ResidenceNumber: f.personal.residenceNumber,

        SignedOffFromAShipDueToMedicalReason: f.health.signedOffFromAShipDueToMedicalReason,
        SignedOffFromAShipDueToMedicalReasonComment:
          f.health.signedOffFromAShipDueToMedicalReasonComment,

        UndergoneAnyMedicalOperation: f.health.undergoneMedicalOperation,
        UndergoneAnyMedicalOperationComment: f.health.medicalOperationDetails,

        DoctorConsultation: f.health.consultedDoctorLast12Months,
        DoctorConsultationComment: f.health.consultedDoctorDetails,

        HealthOrDisabilityProblem: f.health.hasHealthOrDisabilityProblem,
        HealthOrDisabilityProblemComment: f.health.disabilityDetails,

        InquiryOrInvolvedMaritimeAccident: f.professionalHistory.courtOfEnquiryOrAccident,
        InquiryOrInvolvedMaritimeAccidentComment:
          f.professionalHistory.courtOfEnquiryOrAccidentDetails,

        LicenseSuspendedOrRevoked: f.professionalHistory.licenseSuspendedOrRevoked,
        LicenseSuspendedOrRevokedComment:
          f.professionalHistory.licenseSuspendedOrRevokedDetails
      },

      Qualifications: f.education.map((e: any) => ({
        DegreeOrCourse: e.degree,
        MajorOrSubject: e.major,
        CourseIssueDate: e.issueDate,
        ExpiryDate: e.expiryDate,
        University: e.university,
        Country: e.country,
        Type: 1
      })),

      Certificates: f.certificates.map((c: any) => ({
        Capacity: c.capacity,
        Regulation: c.regulation,
        IssueDate: c.issueDate,
        ExpiryDate: c.expiryDate,
        IssuingAuthority: c.authority,
        Limitations: c.limitations,
        Country: c.country,
        Type: 1
      })),

      Languages: f.languages.map((l: any) => ({
        Capacity: l.language,
        Regulation: l.spoken,
        IssueDate: null,
        ExpiryDate: null,
        IssuingAuthority: null,
        Limitations: null,
        Country: null
      })),

      WorkExperiences: f.workExperience.map((w: any) => ({
        VesselName: w.vesselName,
        VesselType: w.vesselType,
        Rank: w.rank,
        From: w.from,
        To: w.to,
        GRT: w.grt,
        BHP: w.bhp,
        CompanyName: w.company
      })),

      References: f.references.references.map((r: any) => ({
        PersonName: r.refName,
        CompanyName: r.refCompany,
        Country: r.refCountry,
        Fax: r.refTelFax,
        EmailId: r.refEmail
      }))
    };
  }


  patchFormForEdit(data: any) {
    // Personal Form
    this.personalForm.patchValue({
      employee: data.EmpId,
      nationality: data.NationalId,
      dob: this.formatDateForInput(data.BirthDate),
      remarks: data.Remarks,
      nearestAirport: data.NearestAirport,
      spouseName: data.NameOfSpouse,
      childrenCount: data.NoOfChildren,
      weight: data.BodyWeight,
      height: data.Height,
      pob: data.BirthPlace,
      religion: data.Religion,
      maritalStatus: data.MaritalStatus,
      residenceNumber: data.ResidenceNumber,
      passportNo: data.PassportNumber,
      passportIssueDate: this.formatDateForInput(data.PassPortIssueDate),
      passportExpiryDate: this.formatDateForInput(data.PassportExpireDate),
      dateOfHire: this.formatDateForInput(data.DateOfHire),
      rank: data.Rank,
      visaSponsor: data.VisaSponsorId,
      visaNo: data.VisaNo,
      visaIssueDate: this.formatDateForInput(data.VisaIssueDate),
      visaExpiryDate: this.formatDateForInput(data.VisaExpiryDate),
      healthInsuranceExpiry: this.formatDateForInput(data.HealthInsuranceExpiry)
    });

    // Calculate Age
    if (data.BirthDate) {
      const birthDate = new Date(data.BirthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      const finalAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
      this.personalForm.get('age')?.setValue(finalAge);
    }

    // Contact Form
    this.contactForm.patchValue({
      email: data.Email,
      permanentAddress: data.PermanentAddressHomeCountry,
      homeContact: data.Phone,
      emergencyContactUAE: data.ContactNameAndNumberDuringEmergenciesUAE,
      emergencyContactHome: data.ContactNameAndNumberDuringEmergenciesHome
    });

    // Offshore Form
    this.offshoreForm.patchValue({
      seamanBookNo: data.SeamanBookNO,
      seamanIssueDate: this.formatDateForInput(data.SeamanIssueDate),
      seamanExpiryDate: this.formatDateForInput(data.SeamanExpiryDate),
      cicpaNo: data.CicpaNO,
      cicpaIssueDate: this.formatDateForInput(data.CicpaIssueDate),
      cicpaExpiryDate: this.formatDateForInput(data.CicpaExpiryDate)
    });

    // Health Form
    this.healthForm.patchValue({
      signedOffFromAShipDueToMedicalReason: data.SignedOffFromAShipDueToMedicalReason,
      signedOffFromAShipDueToMedicalReasonComment: data.SignedOffFromAShipDueToMedicalReasonComment,
      undergoneMedicalOperation: data.UndergoneAnyMdicalOperation,
      medicalOperationDetails: data.UndergoneAnyMdicalOperationComment,
      consultedDoctorLast12Months: data.DoctorConsultation,
      consultedDoctorDetails: data.DoctorConsultationComment,
      hasHealthOrDisabilityProblem: data.HealthOrDisabilityProblem,
      disabilityDetails: data.HealthOrDisabilityProblemComment
    });

    // Education
    this.educationArray.clear();
    data.Qualifications?.forEach((q: any) => {
      this.educationArray.push(this.fb.group({
        degree: q.DegreeOrCourse,
        major: q.MajorOrSubject,
        issueDate: this.formatDateForInput(q.CourseIssueDate),
        expiryDate: this.formatDateForInput(q.ExpiryDate),
        university: q.University,
        country: q.Country
      }));
    });

    // Certificates
    this.certificatesArray.clear();
    data.Certificates?.forEach((c: any) => {
      this.certificatesArray.push(this.fb.group({
        capacity: c.Capacity,
        regulation: c.Regulation,
        issueDate: this.formatDateForInput(c.IssueDate),
        expiryDate: this.formatDateForInput(c.ExpiryDate),
        authority: c.IssuingAuthority,
        limitations: c.Limitations,
        country: c.Country
      }));
    });

    // Languages
    this.languagesArray.clear();
    data.Languages?.forEach((l: any) => {
      this.languagesArray.push(this.fb.group({
        language: l.Capacity,
        spoken: l.Regulation,
        written: l.Written || '',
        understood: l.Understood || '',
        motherTongue: l.MotherTongue || ''
      }));
    });

    // Work Experience
    this.workExperienceArray.clear();
    data.WorkExperiences?.forEach((w: any) => {
      this.workExperienceArray.push(this.fb.group({
        vesselName: w.VesselName,
        vesselType: w.VesselType,
        rank: w.Rank,
        from: this.formatDateForInput(w.From),
        to: this.formatDateForInput(w.To),
        grt: w.GRT,
        bhp: w.BHP,
        company: w.CompanyName
      }));
    });

    // References
    const refsArray = this.referencesForm.get('references') as FormArray;
    refsArray.clear();
    data.References?.forEach((r: any) => {
      refsArray.push(this.createReference({
        refName: r.PersonName,
        refCompany: r.CompanyName,
        refCountry: r.Country,
        refTelFax: r.Fax,
        refEmail: r.EmailId
      }));
    });

    // DP Licenses
    this.dpLicensesArray.clear();
    data.DpLicenses?.forEach((d: any) => {
      this.dpLicensesArray.push(this.createDpLicenseGroup({
        dpType: d.dpType || [],
        dpCert: d.dpCert,
        dpCertNo: d.dpCertNo,
        dpIssueDate: this.formatDateForInput(d.dpIssueDate),
        dpExpiryDate: this.formatDateForInput(d.dpExpiryDate),
        dpAuthority: d.dpAuthority,
        dpCountry: d.dpCountry,
        dpLimitations: d.dpLimitations
      }));
    });
  }


  private formatDateForInput(date: any): string | null {
    if (!date) return null;
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  private calculateAge(dob: any) {
    if (!dob) {
      this.personalForm.get('age')?.setValue('');
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    console.log('DOB changed:', dob, 'Calculated age:', age , 'Month diff:', m); 

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  }

}
