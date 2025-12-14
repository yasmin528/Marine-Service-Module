import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private baseUrl = 'http://176.9.184.190/api/POS/FillEmployee?Id=0&text=&Direction=ltr&InCT';

  fillEmployee(): Observable<Employee[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') }`,
    });
    return this.http.get<Employee[]>(`${this.baseUrl}/FillEmployee` ,{ headers  });
  }
}
