import { Vessel } from './../../core/models/vessel.model';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { VesselService } from '../../core/services/vessel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
  imports: [CommonModule]
})
export class PlanningComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private vesselService: VesselService) { }
  vessels = signal<Vessel[]>([]);
  ngOnInit() {
    this.vesselService.vessels$.subscribe((data) => {
      this.vessels.set(data);
    });
  }
  vesselSchedule(vessel: Vessel) {
    this.router.navigate(
      ['/planning/planningSchedule'],
      { state: { vessel } }
    );
  }
}
