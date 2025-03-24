import { TestBed } from '@angular/core/testing';

import { BonitaService } from './bonita.service';

describe('BonitaService', () => {
  let service: BonitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
