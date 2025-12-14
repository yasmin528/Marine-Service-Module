import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalComponent } from "../../shared/components/Modal/Modal.component";
import { AddVesselComponent } from "./add-vessel/add-vessel.component";
import { CommonModule } from '@angular/common';
import { Vessel } from '../../core/models/vessel.model';
import { VesselService } from '../../core/services/vessel.service';
import { ColumnPanelComponent } from "../../shared/components/column-panel/column-panel.component";

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css'],
  standalone: true,
  imports: [ModalComponent, AddVesselComponent, CommonModule, ColumnPanelComponent]
})
export class VesselsComponent implements OnInit {

  isAddFormOpen: boolean = false;
  isDisplayRow: boolean = false;
  vessels = signal<Vessel[]>([]);
  vesselService = inject(VesselService);

  columns = [
    { key: 'no', label: 'No.', selected: true },
    { key: 'name', label: 'Name', selected: true },
    { key: 'imo', label: 'IMO', selected: true },
    { key: 'year', label: 'Year', selected: true },
    { key: 'type', label: 'Type', selected: true },
    { key: 'flag', label: 'Flag', selected: true },
    { key: 'crew', label: 'Crew', selected: true },
    { key: 'engineType', label: 'Engine Type', selected: false },
    { key: 'engineModel', label: 'Engine Model', selected: false },
    { key: 'owner', label: 'Owner', selected: true },
    { key: 'dwt', label: 'DWT', selected: false },
    { key: 'teu', label: 'TEU', selected: false },
    { key: 'phone', label: 'Phone', selected: false },
    { key: 'email', label: 'E-mail', selected: true },
    { key: 'actions', label: 'Actions', selected: true, disabled: true },
  ];

  visibleColumnKeys: string[] = this.columns.filter(c => c.selected).map(c => c.key);

  constructor() { }

  DisplayRow(){
    this.isDisplayRow = true;
  }

  ngOnInit() {
    this.vesselService.vessels$.subscribe((data) => {
      this.vessels.set(data);
    });
  }
  OpenAddForm() {
    this.isAddFormOpen = true;
  }
  onColumnPanelChange(selectedKeys:any) {
    console.log('Selected columns:', selectedKeys);
    this.visibleColumnKeys = selectedKeys;
  }
}
