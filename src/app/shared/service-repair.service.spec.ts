import { TestBed } from '@angular/core/testing';

import { ServiceRepairService } from './service-repair.service';

describe('ServiceRepairService', () => {
  let service: ServiceRepairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRepairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
