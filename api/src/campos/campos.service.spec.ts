import { Test, TestingModule } from '@nestjs/testing';
import { CamposService } from './campos.service';

describe('CamposService', () => {
  let service: CamposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CamposService],
    }).compile();

    service = module.get<CamposService>(CamposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
