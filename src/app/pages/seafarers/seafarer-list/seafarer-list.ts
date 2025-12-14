import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ModalComponent } from '../../../shared/components/Modal/Modal.component';
import { Seafarer } from '../../../core/models/seafarer.model';
import { SeafarerService } from '../../../core/services/seaferer.service';
import { seafarerTableColumns as SEAFARER_COLUMNS } from '../seafarer-columns';
import { ColumnPanelComponent } from "../../../shared/components/column-panel/column-panel.component";
import { SeafarerForm } from "../seafarer-form/seafarer-form";

@Component({
  selector: 'app-seafarer-list',
  imports: [CommonModule, ModalComponent, ColumnPanelComponent, SeafarerForm],
  templateUrl: './seafarer-list.html',
  standalone: true,
  styleUrl: './seafarer-list.css',
})
export class SeafarerList {

  isFilterOpen = false;
  isSeafarerFormOpen = false;
  isDisplayColumnsOpen: boolean = false;
  seafarers = signal<Seafarer[]>([]);
  tableColumns = SEAFARER_COLUMNS;
  selectedSeafarer: any = null;


  visibleColumnKeys: string[] = this.tableColumns.filter(c => c.selected).map(c => c.key);

  constructor(private seafarerService: SeafarerService) {
    this.loadSeafarers();
  }
  toggleColumn(col: any) {
    col.visible = !col.visible;
  }

  closePanel() {
    this.isDisplayColumnsOpen = false;
  }


  private loadSeafarers() {
    this.seafarerService.getAllSeafarers().subscribe((data) => {
      this.seafarers.set(data);
    });
  }
  openAddSeafarerForm() {
    console.log('Add Seafarer button clicked');
    this.isSeafarerFormOpen = true;
  }
  OpenDisplayColumns() {
    this.isDisplayColumnsOpen = !this.isDisplayColumnsOpen;
  }
  openFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  onColumnPanelChange(selectedKeys: any) {
    console.log('Selected columns:', selectedKeys);
    this.visibleColumnKeys = selectedKeys;
  }

  isColumnVisible(key: string) {
    return this.visibleColumnKeys.includes(key);
  }
  getSeafarerValue(seafarer: Seafarer, key: keyof Seafarer): any {
    return seafarer[key] ?? '-';
  }
  isEdit(s: Seafarer) {
    this.selectedSeafarer = s;
    console.log('Editing Seafarer:', s);
    this.isSeafarerFormOpen = true;
  }

  toggleSeafarerStatus(id: number, empId:number, newStatus: number): void {
    const action = newStatus === 2 ? 'activate' : 'deactivate';
    if (!confirm(`Are you sure you want to ${action} this seafarer (ID: ${id})?`)) {
      return;
    }
    this.seafarerService.updateStatus(id,empId, newStatus).subscribe({
      next: () => {
        console.log(`Seafarer ID ${id} set to status: ${newStatus}`);
      },
      error: (err: any) => {
        console.error(`Error updating status for ID ${id}:`, err);
        alert(`Failed to ${action} seafarer.`);
      }
    });
  }
}
