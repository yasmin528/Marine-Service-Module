import { VesselService } from './../../core/services/vessel.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PayrollRecord } from '../../core/models/payrollRecord.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PayRollService } from '../../core/services/pay-roll.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class PayrollComponent implements OnInit ,AfterViewInit {

  payrollForm!: FormGroup;
  months = ["All", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  vessels: string[] = [];
  filteredRecords: PayrollRecord[] = [];

  constructor(private fb: FormBuilder, private payrollService: PayRollService ,private VesselService: VesselService) { }
  
  get selectedMonth(): FormControl {
    return this.payrollForm.get('selectedMonth')! as FormControl;
  }

  get selectedVessel(): FormControl {
    return this.payrollForm.get('selectedVessel')! as FormControl;
  }

  ngOnInit(): void {
    this.payrollForm = this.fb.group({
      selectedMonth: ['All'],
      selectedVessel: ['All']
    });

  }
  ngAfterViewInit(): void {
    this.payrollService.records$.subscribe(records => {
      this.applyFilters();
    });
    this.VesselService.vessels$.subscribe(vessel => {
      this.vessels = ['All', ...vessel.map(v => v.name)];
    });
    this.payrollForm.valueChanges.subscribe(() => this.applyFilters());
  }
  applyFilters() {
    const { selectedMonth, selectedVessel } = this.payrollForm.value;
    this.filteredRecords = this.payrollService.getRecords().filter(record => {
      console.log(record.period, selectedMonth, record.vessel, selectedVessel);
      const monthMatch = selectedMonth === 'All' || record.period.includes(selectedMonth);
      const vesselMatch = selectedVessel === 'All' || record.vessel === selectedVessel;
      return monthMatch && vesselMatch;
    });
    console.log(this.filteredRecords);
  }

  updatePayrollStatus(record: PayrollRecord, newStatus: 'Paid' | 'Pending') {
    this.payrollService.updateStatus(record.id, newStatus);
  }

  exportPayroll() {
    alert('Exporting payroll data (placeholder)');
  }
  alert(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
