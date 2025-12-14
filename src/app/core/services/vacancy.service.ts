import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VacancyRecord } from '../models/vacancyRecord.model';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
 private vacanciesSource = new BehaviorSubject<VacancyRecord[]>([]);
  vacancies$: Observable<VacancyRecord[]> = this.vacanciesSource.asObservable();

  constructor() {
    this.vacanciesSource.next([
      {
        id: 1,
        title: 'Captain',
        vessel: 'MV Voyager',
        postedDate: '2025-06-20',
        status: 'Open',
        applicantsCount: 12,
        showApplicants: false,
        applicantsList: [
          { no: 1, name: 'Daniel Swainey', age: 45, nationality: 'UA', rank: 'Captain', status: 'Available', readiness: 'High' }
        ]
      },
      {
        id: 2,
        title: 'Chief Engineer',
        vessel: 'MT Neptune',
        postedDate: '2025-06-15',
        status: 'Open',
        applicantsCount: 8,
        showApplicants: false,
        applicantsList: []
      },
      {
        id: 3,
        title: 'Oiler',
        vessel: 'Bulk Master',
        postedDate: '2025-05-30',
        status: 'Closed',
        applicantsCount: 25,
        showApplicants: false,
        applicantsList: []
      }
    ]);
  }

  addVacancy(vacancy: VacancyRecord) {
    const current = this.vacanciesSource.getValue();
    this.vacanciesSource.next([...current, vacancy]);
  }
}
