import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VesselPlanning } from '../models/vesselPlanning.model';
import { PlanningAssignment } from '../models/planningAssignment.model';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  private planningData: Record<string, VesselPlanning> = {
    '50 LET OKTYABRYA': {
      ranks: ['1st Engineer', '2nd Engineer', '2nd Officer', '3rd Engineer', 'Master', 'N.B. Supervisor', 'Shop Assistant', 'Staff Captain', 'Steward(ess)'],
      assignments: [
        { id: 1, rank: '1st Engineer', seafarerName: 'Dinorah Buerger - UA', startDate: '2025-01-01', endDate: '2025-05-15', color: 'bg-gray-400' },
        { id: 2, rank: '1st Engineer', seafarerName: 'seafarer test 2 - UA', startDate: '2025-07-10', endDate: '2025-12-31', color: 'bg-blue-500' },
        { id: 3, rank: '2nd Engineer', seafarerName: 'Adan Daughtery - UA', startDate: '2025-01-15', endDate: '2025-03-30', color: 'bg-red-400' },
        { id: 4, rank: '2nd Engineer', hasWarning: true },
        { id: 5, rank: '2nd Officer', seafarerName: 'alberto rodrigo - UA', startDate: '2025-02-10', endDate: '2025-04-25', color: 'bg-gray-400' },
        { id: 6, rank: '3rd Engineer', seafarerName: 'Emmitt Deeb - UA', startDate: '2025-01-05', endDate: '2025-03-20', color: 'bg-red-400' },
        { id: 7, rank: 'Master', seafarerName: 'durga prasad - UA', startDate: '2025-05-20', endDate: '2025-08-10', color: 'bg-blue-500' },
        { id: 8, rank: 'N.B. Supervisor', seafarerName: 'Faye Ball - L', startDate: '2025-03-01', endDate: '2025-04-10', color: 'bg-red-400' },
        { id: 9, rank: 'Staff Captain', seafarerName: 'Francisco Mejia - UA', startDate: '2025-04-28', endDate: '2025-07-15', color: 'bg-blue-500' },
      ]
    },
    'MV Voyager': {
      ranks: ['Captain', 'Chief Mate', '2nd Mate', 'Chief Engineer', 'Oiler', 'Cook'],
      assignments: [
        { id: 10, rank: 'Captain', seafarerName: 'John Doe - PH', startDate: '2025-02-01', endDate: '2025-08-01', color: 'bg-blue-500' },
        { id: 11, rank: 'Chief Engineer', hasWarning: true },
        { id: 12, rank: 'Cook', seafarerName: 'Ben Carter - US', startDate: '2025-04-10', endDate: '2025-10-10', color: 'bg-green-500' },
      ]
    },
    'MT Neptune': {
      ranks: ['Captain', 'Chief Engineer', 'Pumpman'],
      assignments: [
        { id: 13, rank: 'Chief Engineer', seafarerName: 'Alex Ray - IN', startDate: '2025-03-15', endDate: '2025-09-15', color: 'bg-blue-500' },
      ]
    },
    'Bulk Master': {
      ranks: ['Captain', 'Chief Mate', 'Chief Engineer', 'Bosun'],
      assignments: []
    }
  };

  private planningSubject = new BehaviorSubject<Record<string, VesselPlanning>>(this.planningData);

  constructor() { }

  getPlanningData(): Observable<Record<string, VesselPlanning>> {
    return this.planningSubject.asObservable();
  }

  getVesselPlanning(vesselName: string): Observable<VesselPlanning | null> {
    const vesselData = this.planningData[vesselName] ?? null;
    return new BehaviorSubject<VesselPlanning | null>(vesselData).asObservable();
  }

  updateVesselAssignments(vesselName: string, assignments: PlanningAssignment[]) {
    if (this.planningData[vesselName]) {
      this.planningData[vesselName].assignments = assignments;
      this.planningSubject.next(this.planningData);
    }
  }
}
