import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairServicesComponent } from './repair-services.component';

describe('RepairServicesComponent', () => {
  let component: RepairServicesComponent;
  let fixture: ComponentFixture<RepairServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
