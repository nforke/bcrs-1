import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMaintenanceComponent } from './site-maintenance.component';

describe('SiteMaintenanceComponent', () => {
  let component: SiteMaintenanceComponent;
  let fixture: ComponentFixture<SiteMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
