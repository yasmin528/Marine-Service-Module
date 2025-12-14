import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PayrollRecord } from '../models/payrollRecord.model';

@Injectable({
  providedIn: 'root'
})
export class PayRollService {

  constructor() { }
  private recordsSource = new BehaviorSubject<PayrollRecord[]>([
    { id: 1, name: 'John Doe', rank: 'Captain', vessel: 'MV Voyager', period: 'June 2025', salary: 12000, allowances: 1500, deductions: 800, netPay: 12700, status: 'Paid' },
    { id: 2, name: 'Alex Ray', rank: 'Chief Engineer', vessel: 'MT Neptune', period: 'June 2025', salary: 9500, allowances: 1000, deductions: 650, netPay: 9850, status: 'Paid' },
    { id: 3, name: 'Chris Smith', rank: 'First Mate', vessel: 'Bulk Master', period: 'June 2025', salary: 7000, allowances: 800, deductions: 500, netPay: 7300, status: 'Pending' },
    { id: 4, name: 'Ben Carter', rank: 'Cook', vessel: 'MV Voyager', period: 'June 2025', salary: 3500, allowances: 400, deductions: 200, netPay: 3700, status: 'Pending' },
  ]);

  records$ = this.recordsSource.asObservable();

  getRecords() {
    return this.recordsSource.getValue();
  }

  updateStatus(id: number, status: 'Paid' | 'Pending') {
    const records = this.getRecords().map(record =>
      record.id === id ? { ...record, status } : record
    );
    this.recordsSource.next(records);
  }
}
