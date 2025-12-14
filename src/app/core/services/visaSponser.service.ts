import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisaSponserService {

  constructor() { }
  private http = inject(HttpClient);
  private baseUrl = 'http://176.9.184.190/api/LegalAffairs/FillVendor?Id=0&text=&Direction=ltr&InCT';

  fillVendor(): Observable<VisaVendor[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') }`,
    });
    return this.http.get<VisaVendor[]>(`${this.baseUrl}/FillVendor`, { headers });
  }
}
