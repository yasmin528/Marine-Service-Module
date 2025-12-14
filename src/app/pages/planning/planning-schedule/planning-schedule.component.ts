import { Component, inject, OnInit, signal } from '@angular/core';
import { Vessel } from '../../../core/models/vessel.model';
import { Router } from '@angular/router';
import { PlanningService } from '../../../core/services/planning.service';
import { VesselPlanning } from '../../../core/models/vesselPlanning.model';
import { CommonModule } from '@angular/common';
import { console } from 'inspector';

@Component({
  selector: 'app-planning-schedule',
  imports: [CommonModule],
  templateUrl: './planning-schedule.component.html',
  styleUrls: ['./planning-schedule.component.css'],

})
export class PlanningScheduleComponent implements OnInit {

  vessel = signal<Vessel | null>(null);
  vesselPlanning = signal<VesselPlanning | null>(null);

  router = inject(Router);
  planningService = inject(PlanningService);

  ngOnInit() {
    const vesselFromState = history.state.vessel;
    this.vessel.set(vesselFromState);

    if (vesselFromState?.name) {
      this.planningService.getVesselPlanning(vesselFromState.name).subscribe({
        next: (data) => {
          this.vesselPlanning.set(data);
        }
      });
    }
  }

  backToVesselList() {
    this.router.navigate(['/planning']);
  }
  calculateLeft(startDate: string): number {
    const start = new Date(startDate);
    const yearStart = new Date(start.getFullYear(), 0, 1);
    const yearEnd = new Date(start.getFullYear(), 11, 31);
    return ((start.getTime() - yearStart.getTime()) / (yearEnd.getTime() - yearStart.getTime())) * 100;
  }

  calculateWidth(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const yearStart = new Date(start.getFullYear(), 0, 1);
    const yearEnd = new Date(start.getFullYear(), 11, 31);
    return ((end.getTime() - start.getTime()) / (yearEnd.getTime() - yearStart.getTime())) * 100;
  }
  getAssignmentsByRank(rank: string) {
    return this.vesselPlanning()?.assignments.filter(a => a.rank === rank) || [];
  }

  onDragStart(event: DragEvent, assignmentId: number) {
    event.dataTransfer?.setData('text/plain', assignmentId.toString());
  }
  onDragEnd(event: DragEvent) {
  }

  onDrop(event: DragEvent, rank: string) {
  }
  onDragOver(event: DragEvent ) {
  }

  onDragEnter(event: DragEvent) {
  }
}
