import { VacancyService } from './../../core/services/vacancy.service';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { NewVacancyComponent } from "./new-vacancy/new-vacancy.component";
import { ModalComponent } from "../../shared/components/Modal/Modal.component";
import { CommonModule } from '@angular/common';
import { VacancyRecord } from '../../core/models/vacancyRecord.model';
import { ShowMessageComponent } from "../../shared/components/showMessage/showMessage.component";

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css'],
  imports: [NewVacancyComponent, ModalComponent, CommonModule, ShowMessageComponent]
})
export class VacancyComponent implements OnInit {

  isVacanyFormOpen: boolean = false;
  VacancyService = inject(VacancyService);
  vacancies = signal<VacancyRecord[]>([]);
  expandedRows = signal<number[]>([]);
  @ViewChild('msgBox') msgBox!: ShowMessageComponent;

  showMessage(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.msgBox.show(message, type);
  }

  constructor() { }

  ngOnInit() {
    this.VacancyService.vacancies$.subscribe(data => {
      console.log("Vacancy Data:", data);
      this.vacancies.set(data);
    });
  }
  openVacanyForm() {
    this.isVacanyFormOpen = true;
  }
  toggleRow(id: number) {
    const current = this.expandedRows();
    if (current.includes(id)) {
      this.expandedRows.set(current.filter(rowId => rowId !== id));
    } else {
      this.expandedRows.set([...current, id]);
    }
  }

  isExpanded(id: number) {
    return this.expandedRows().includes(id);
  }
  edit(vacancy: VacancyRecord) {
    this.showMessage(`Editng vacancy ${vacancy.title}`)
  }
  view(vacancy: VacancyRecord) {
    this.showMessage(`Viewing vacancy ${vacancy.title}`)
  }
  close(vacancy: VacancyRecord) {
    this.showMessage(`Closing vacancy ${vacancy.title}`)
  }

}
