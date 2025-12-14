/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddVesselComponent } from './add-vessel.component';

describe('AddVesselComponent', () => {
  let component: AddVesselComponent;
  let fixture: ComponentFixture<AddVesselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVesselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVesselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
