import { TestBed } from '@angular/core/testing';

import { LineItemService } from './line-item.service';

describe('LineItemService', () => {
  let service: LineItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
