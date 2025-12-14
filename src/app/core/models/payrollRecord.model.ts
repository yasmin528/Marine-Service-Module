export interface PayrollRecord {
  id: number;
  name: string;
  rank: string;
  vessel: string;
  period: string;
  salary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: string;
}
