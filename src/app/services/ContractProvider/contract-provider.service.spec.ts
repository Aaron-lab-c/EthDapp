import { TestBed } from '@angular/core/testing';

import { ContractProviderService } from './contract-provider.service';

describe('ContractProviderService', () => {
  let service: ContractProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
