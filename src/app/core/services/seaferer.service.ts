import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Seafarer } from '../models/seafarer.model';
import { SaveSeafarerRequest } from '../models/seafarer-save.model';


@Injectable({
  providedIn: 'root',
})
export class SeafarerService {
  private apiUrl = 'http://176.9.184.190/api/MarineServices';

  constructor(private http: HttpClient) { }

  getAllSeafarers(): Observable<Seafarer[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<Seafarer[]>(`${this.apiUrl}/GetAllSeafarers?Direction=ltr&InCT`, { headers }).pipe(
      tap((data) => {
        // console.log('Fetched seafarers:', data);
      })
    );
  }

  saveSeafarer(payload: SaveSeafarerRequest): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    });

    return this.http.post(`${this.apiUrl}/SaveSeafarer?InCT`, payload,{ headers });
  }
  
  updateStatus(seafarerId: number, empId: number, status: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    });

    const params = new HttpParams()
      .set('Id', seafarerId.toString())
      .set('Status', status.toString())
      .set('EmpId', empId.toString())
      .set('InCT', '');

    return this.http.post(
      `${this.apiUrl}/ActivateAndInActivateSeafarer`,
      {},
      { headers, params }
    );
  }

}
