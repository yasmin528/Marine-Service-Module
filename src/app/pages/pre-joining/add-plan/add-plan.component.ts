import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {

   @Output() closeForm = new EventEmitter<boolean>();
  close(){
    this.closeForm.emit(false);
  }
  constructor() { }

  ngOnInit() {
  }

}
