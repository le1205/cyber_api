import { Test, TestingModule } from '@nestjs/testing';
import { AboutsService } from './abouts.service';

describe('AboutsService', () => {
  let service: AboutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutsService],
    }).compile();

    service = module.get<AboutsService>(AboutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
