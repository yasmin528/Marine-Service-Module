import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-column-panel',
  templateUrl: './column-panel.component.html',
  styleUrls: ['./column-panel.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ColumnPanelComponent implements OnInit {
  @Input() columns: { key: string, label: string, selected?: boolean, disabled?: boolean ,type?: string }[] = [];
  @Output() selectionChange = new EventEmitter<string[]>(); 
  @Output() close = new EventEmitter<void>();
  columnForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.columnForm = this.fb.group({
      columns: this.fb.array(
        this.columns.map(col => this.fb.control({ value: col.selected, disabled: col.disabled || false }))
      )
    });

    (this.columnForm.get('columns') as FormArray).valueChanges.subscribe(() => {
    
      this.emitSelectedColumns();
    });

    this.emitSelectedColumns();
  }

  get columnControls(): FormControl[] {
    return (this.columnForm.get('columns') as FormArray).controls as FormControl[];
  }

  private emitSelectedColumns() {
    const selectedKeys : string[] = this.columns
      .filter((col, i) => this.columnControls[i].value)
      .map(col => col.key);
    this.selectionChange.emit( selectedKeys);
  }
  onClose(){
    this.close.emit();
  }
}
