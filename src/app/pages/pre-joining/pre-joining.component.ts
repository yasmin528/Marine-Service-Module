import { Component, OnInit } from '@angular/core';
import { ModalComponent } from "../../shared/components/Modal/Modal.component";
import { AddPlanComponent } from "./add-plan/add-plan.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pre-joining',
  templateUrl: './pre-joining.component.html',
  styleUrls: ['./pre-joining.component.css'],
  imports: [ModalComponent, AddPlanComponent,CommonModule]
})
export class PreJoiningComponent implements OnInit {
  isAddPlanFormOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  openAddPlanForm(){
    this.isAddPlanFormOpen = true;
  }
}
