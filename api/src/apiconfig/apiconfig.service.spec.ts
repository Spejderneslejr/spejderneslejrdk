import { Test, TestingModule } from '@nestjs/testing';
import { ApiconfigService } from './apiconfig.service';

describe('ApiconfigService', () => {
  let service: ApiconfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiconfigService],
    }).compile();

    service = module.get<ApiconfigService>(ApiconfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
